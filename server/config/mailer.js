import nodemailer from 'nodemailer';
import { contactEmailHtml, contactEmailSubject, contactEmailText } from './emailTemplate.js';

// Email is optional: if SMTP settings are missing, messages are still saved in MongoDB
// (read them with `npm run messages`) and the server logs that no email was sent.
let transporter = null;

export function mailerReady() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

// Sends the “new contact message” notification. Returns true if the email went out.
export async function sendContactEmail(msg) {
  if (!mailerReady()) {
    console.warn('✉  SMTP not configured — contact message saved, no email sent.');
    return false;
  }
  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: { name: msg.name, address: msg.email },
      subject: contactEmailSubject(msg),
      html: contactEmailHtml(msg), // styled version (visitor text is escaped)
      text: contactEmailText(msg), // plain-text fallback
    });
    return true;
  } catch (err) {
    console.error('✉  Email failed:', err.message);
    return false;
  }
}
