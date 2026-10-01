// Shows the latest contact messages (there is no admin panel yet).
//   npm run messages            → latest 20
//   npm run messages -- 50      → latest 50
//   npm run messages -- --new   → only messages not yet marked as read
//   npm run messages -- --mark-read → mark all new messages as read
import 'dotenv/config';
import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';

const args = process.argv.slice(2);
const limit = Number(args.find((a) => /^\d+$/.test(a))) || 20;
const onlyNew = args.includes('--new');
const markRead = args.includes('--mark-read');

await mongoose.connect(process.env.MONGODB_URI);

if (markRead) {
  const { modifiedCount } = await ContactMessage.updateMany({ status: 'new' }, { status: 'read' });
  console.log(`✅ Marked ${modifiedCount} message(s) as read.`);
} else {
  const filter = onlyNew ? { status: 'new' } : {};
  const [messages, total, unread] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ status: 'new' }),
  ]);

  console.log(`📬 ${total} message(s) in total · ${unread} new\n`);
  for (const m of messages) {
    const date = new Date(m.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`${m.status === 'new' ? '● NEW ' : '  '}${date} · ${m.subject}`);
    console.log(`  From: ${m.name} <${m.email}>   Email sent: ${m.emailSent ? 'yes' : 'no'}`);
    console.log(`  ${m.message.replace(/\n/g, '\n  ')}`);
    console.log('  ' + '─'.repeat(60));
  }
  if (!messages.length) console.log('No messages yet.');
}

await mongoose.disconnect();
