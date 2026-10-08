// Loads all website content into MongoDB Atlas.
//   npm run seed           → validate + write content.json + replace the `pages` collection
//   npm run seed -- --check → validate + write content.json only (no database changes)
import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import mongoose from 'mongoose';
import Page, { BLOCK_TYPES } from '../models/Page.js';
import { pages } from './content.js';

const CHECK_ONLY = process.argv.includes('--check');

// ── 1. Validate the content before touching the database ───────────────────
function validate() {
  const errors = [];
  const slugs = new Set();
  const orders = [];

  const walk = (blocks, where) => {
    if (!Array.isArray(blocks)) return errors.push(`${where}: blocks must be an array`);
    blocks.forEach((b, i) => {
      const at = `${where} › block ${i + 1}`;
      if (!b || !BLOCK_TYPES.includes(b.type)) errors.push(`${at}: unknown block type “${b?.type}”`);
      if (b.head) walk(b.head, `${at} (${b.type} head)`);
      if (b.blocks) walk(b.blocks, `${at} (${b.type})`);
      b.cards?.forEach((c, j) => walk(c.blocks || [], `${at} › card ${j + 1} “${c.title}”`));
      b.columns?.forEach?.((c, j) => walk(c.blocks || [], `${at} › column ${j + 1} “${c.title}”`));
    });
  };

  pages.forEach((p) => {
    const where = `page “${p.slug}”`;
    if (!p.slug || !p.title) errors.push(`${where}: slug and title are required`);
    if (slugs.has(p.slug)) errors.push(`${where}: duplicate slug`);
    slugs.add(p.slug);
    if (p.order != null) orders.push(p.order);
    walk(p.blocks, where);
  });

  orders.sort((a, b) => a - b);
  orders.forEach((o, i) => {
    if (o !== i + 1) errors.push(`journey order must run 1…${orders.length} with no gaps (found ${orders.join(', ')})`);
  });

  return { errors: [...new Set(errors)], steps: orders.length };
}

// ── 2. Count blocks (for the summary) ──────────────────────────────────────
function countBlocks(blocks = []) {
  return blocks.reduce((n, b) => {
    let inner = countBlocks(b.blocks);
    b.cards?.forEach((c) => (inner += countBlocks(c.blocks)));
    b.columns?.forEach?.((c) => (inner += countBlocks(c.blocks)));
    return n + 1 + inner;
  }, 0);
}

async function run() {
  const { errors, steps } = validate();
  if (errors.length) {
    console.error('❌ Content is not valid:\n  • ' + errors.join('\n  • '));
    process.exit(1);
  }

  const json = new URL('./content.json', import.meta.url);
  writeFileSync(json, JSON.stringify(pages, null, 2));
  const totalBlocks = pages.reduce((n, p) => n + countBlocks(p.blocks), 0);
  console.log(`✅ Content valid: ${pages.length} pages (${steps} journey steps + ${pages.length - steps} extra), ${totalBlocks} blocks`);
  console.log('📝 Snapshot written to seed/content.json');

  if (CHECK_ONLY) return;

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<')) {
    console.error('❌ MONGODB_URI is missing in server/.env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log(`🔌 Connected to ${mongoose.connection.host}/${mongoose.connection.name}`);

  await Page.deleteMany({});
  await Page.syncIndexes();
  const inserted = await Page.insertMany(pages);
  console.log(`🌱 Inserted ${inserted.length} pages into “pages”`);

  inserted
    .filter((p) => p.order != null)
    .sort((a, b) => a.order - b.order)
    .forEach((p) => console.log(`   ${String(p.order).padStart(2)}. ${p.title}  →  /${p.slug}`));
  inserted
    .filter((p) => p.order == null)
    .forEach((p) => console.log(`    +  ${p.title}  →  /${p.slug}${p.status === 'draft' ? '  (draft)' : ''}`));

  await mongoose.disconnect();
  console.log('✅ Migration complete');
}

run().catch(async (err) => {
  console.error('❌ Seed failed:', err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
