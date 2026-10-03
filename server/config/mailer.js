import { promises as dns } from 'node:dns';
import nodemailer from 'nodemailer';
import { contactEmailHtml, contactEmailSubject, contactEmailText } from './emailTemplate.js';

// Email is optional: if SMTP settings are missing, messages are still saved in MongoDB
// (read them with `npm run messages`) and the server logs that no email was sent.

export function mailerReady() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO);
}

// Some hosts (e.g. Render) cannot reach IPv6, others cannot reach IPv4. So we look up BOTH
// the IPv4 and IPv6 addresses of the mail server and try them one by one until one works:
//   IPv4 addresses → IPv6 addresses → the plain host name (last resort).
// TLS always checks the certificate against the real host name (e.g. smtp.gmail.com).
// The address that worked is remembered for 10 minutes, so later emails go straight to it.
const REMEMBER_MS = 10 * 60 * 1000;
let lastGood = { address: null, at: 0 };

async function candidateAddresses(host) {
  const [v4, v6] = await Promise.allSettled([dns.resolve4(host), dns.resolve6(host)]);
  const ipv4 = v4.status === 'fulfilled' ? v4.value.map((a) => ({ address: a, family: 'IPv4' })) : [];
  const ipv6 = v6.status === 'fulfilled' ? v6.value.map((a) => ({ address: a, family: 'IPv6' })) : [];
  const list = [...ipv4, ...ipv6, { address: host, family: 'host name' }];

  // Put the address that worked last time first.
  if (lastGood.address && Date.now() - lastGood.at < REMEMBER_MS) {
    const i = list.findIndex((c) => c.address === lastGood.address);
    if (i > 0) list.unshift(...list.splice(i, 1));
  }
  return list;
}

function transportFor(address, host) {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: address,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { servername: host }, // verify the certificate for the real host name, not the IP
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

// Errors where trying another address will not help (wrong password, rejected message…).
const isFinal = (err) => err.code === 'EAUTH' || err.code === 'EENVELOPE' || (err.responseCode >= 500 && err.responseCode < 600);

// Sends the “new contact message” notification. Returns true if the email went out.
export async function sendContactEmail(msg) {
  if (!mailerReady()) {
    console.warn('✉  SMTP not configured — contact message saved, no email sent.');
    return false;
  }
  const host = process.env.SMTP_HOST;
  const mail = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO,
    replyTo: { name: msg.name, address: msg.email },
    subject: contactEmailSubject(msg),
    html: contactEmailHtml(msg), // styled version (visitor text is escaped)
    text: contactEmailText(msg), // plain-text fallback
  };

  const candidates = await candidateAddresses(host);
  for (const c of candidates) {
    const transporter = transportFor(c.address, host);
    try {
      await transporter.sendMail(mail);
      lastGood = { address: c.address, at: Date.now() };
      return true;
    } catch (err) {
      console.error(`✉  Email via ${c.family} ${c.address} failed: ${err.code || ''} ${err.message}`);
      if (isFinal(err)) break; // e.g. wrong App Password — another address won’t help
    } finally {
      transporter.close();
    }
  }
  console.error('✉  Email not sent — the message is still saved in MongoDB (npm run messages).');
  return false;
}
