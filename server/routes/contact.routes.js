import { Router } from 'express';
import ContactMessage, { CONTACT_SUBJECTS } from '../models/ContactMessage.js';
import { sendContactEmail } from '../config/mailer.js';
import { contactLimiter } from '../middleware/rateLimits.js';

const router = Router();

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v) => (typeof v === 'string' ? v.trim() : '');

// Checks the form. Returns { data, errors }.
function validate(body = {}) {
  const data = {
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    subject: str(body.subject),
    message: str(body.message),
  };
  const errors = {};
  if (!data.name) errors.name = 'Please enter your name.';
  else if (data.name.length > 120) errors.name = 'Name is too long.';
  if (!EMAIL.test(data.email) || data.email.length > 200) errors.email = 'Please enter a valid email address.';
  if (!CONTACT_SUBJECTS.includes(data.subject)) data.subject = CONTACT_SUBJECTS[0];
  if (data.message.length < 10) errors.message = 'Please write a message (at least 10 characters).';
  else if (data.message.length > 5000) errors.message = 'Message is too long (5000 characters maximum).';
  return { data, errors };
}

// POST /api/contact → save the message in MongoDB, then email it to the official address.
router.post('/contact', contactLimiter, async (req, res, next) => {
  try {
    // Spam trap: real visitors never fill the hidden “company” field. Pretend success, store nothing.
    if (str(req.body?.company)) return res.status(201).json({ ok: true });

    const { data, errors } = validate(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: Object.values(errors)[0], errors });
    }

    const saved = await ContactMessage.create({
      ...data,
      meta: { ip: req.ip || '', userAgent: String(req.get('user-agent') || '').slice(0, 300) },
    });

    // The visitor gets their answer immediately; the email is sent in the background.
    res.status(201).json({ ok: true });

    sendContactEmail(saved)
      .then((sent) => sent && ContactMessage.updateOne({ _id: saved._id }, { emailSent: true }))
      .catch((err) => console.error('✉  Could not record email status:', err.message));
  } catch (err) {
    next(err);
  }
});

export default router;
