import { Router } from 'express';
import Page from '../models/Page.js';

const router = Router();

// Pages that are not content (never returned as results).
const SKIP = new Set(['search', 'not-found']);

// Collects every piece of visible text in a page, remembering which chapter it belongs to.
function collectTexts(page) {
  const out = [];
  let anchor = null;
  const push = (text) => typeof text === 'string' && text.trim() && out.push({ text, anchor });

  const walk = (blocks = []) => {
    for (const b of blocks) {
      if (b.type === 'pending') continue;
      if (b.type === 'heading' && b.anchor) anchor = b.anchor;
      push(b.text);
      push(b.question);
      push(b.label);
      push(b.note);
      push(b.number);
      b.items?.forEach((item) => {
        if (typeof item === 'string') push(item);
        else {
          push(item.text);
          push(item.title);
          push(item.left);
          push(item.right);
          push(item.value);
          push(item.label);
        }
      });
      b.rows?.forEach((r) => {
        push(r.label);
        r.links?.forEach((l) => push(l.text));
      });
      b.cards?.forEach((c) => {
        push(c.title);
        walk(c.blocks);
      });
      if (Array.isArray(b.columns))
        b.columns.forEach((c) => {
          push(c.title);
          walk(c.blocks);
        });
      if (b.head) walk(b.head);
      if (b.blocks) walk(b.blocks);
    }
  };

  push(page.title);
  push(page.subtitle);
  walk(page.blocks);
  return out;
}

const clean = (s) => s.toLowerCase().replace(/[“”‘’"'?.,!:;()]/g, ' ').replace(/\s+/g, ' ').trim();

// GET /api/search?q=suffering → [{ slug, title, order, anchor, snippet }]
router.get('/search', async (req, res, next) => {
  try {
    const q = String(req.query.q || '').slice(0, 100);
    const words = clean(q)
      .split(' ')
      .filter((w) => w.length > 1 && !['the', 'and', 'what', 'why', 'how', 'who', 'is', 'do', 'does', 'am', 'we', 'an', 'of', 'to', 'in'].includes(w));
    // Questions made only of common words (e.g. “Who am I?”) are searched as a whole phrase.
    if (!words.length) {
      const phrase = clean(q);
      if (phrase.length < 2) return res.json([]);
      words.push(phrase);
    }

    const pages = await Page.find({ status: 'published' }).select('slug title order blocks subtitle').lean();
    const results = [];

    for (const page of pages) {
      if (SKIP.has(page.slug)) continue;
      const texts = collectTexts(page);
      let best = null;
      for (const t of texts) {
        const hay = clean(t.text);
        const hits = words.filter((w) => hay.includes(w)).length;
        if (!hits) continue;
        // Prefer the text matching the most words; among equals, prefer a real sentence
        // over a single-word label (e.g. a flow chip), then the shorter one.
        const rank = hits * 1000 + (t.text.length >= 25 ? 500 : 0) - Math.min(t.text.length, 400);
        if (!best || rank > best.rank) best = { ...t, hits, rank };
      }
      if (!best) continue;
      const score = best.hits * 10 + (clean(page.title).includes(words[0]) ? 5 : 0);
      results.push({
        slug: page.slug,
        title: page.title,
        order: page.order,
        anchor: best.anchor || '',
        snippet: best.text.length > 180 ? `${best.text.slice(0, 177)}…` : best.text,
        score,
      });
    }

    results.sort((a, b) => b.score - a.score || (a.order ?? 99) - (b.order ?? 99));
    res.json(results.slice(0, 20).map(({ score, ...r }) => r));
  } catch (err) {
    next(err);
  }
});

export default router;
