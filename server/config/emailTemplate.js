// The “new contact message” email, styled like the website (Option B · The Path).
// Email clients support only simple HTML, so this uses tables + inline styles,
// web-safe fonts (Georgia for headings) and no images — it renders the same in Gmail,
// Outlook and phone mail apps.

const C = {
  panel: '#1D3A40',
  panelText: '#EAF1EE',
  panelMuted: '#A9C2BE',
  peach: '#F2B880',
  peachText: '#9A5B24',
  bg: '#FAF8F3',
  ink: '#1B2A2E',
  body: '#4B5A5C',
  muted: '#7A8787',
  line: '#E3E0D6',
  softPeach: '#FFF1E2',
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Everything typed by the visitor is escaped — it can never become HTML or a link.
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const formatDate = (d) =>
  new Date(d).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }) + ' IST';

export function contactEmailSubject(msg) {
  return `New message · ${msg.subject} — ${msg.name}`;
}

export function contactEmailText(msg) {
  return [
    'NEW MESSAGE FROM THE KRISHANAVTAR.COM CONTACT FORM',
    '',
    `Name:     ${msg.name}`,
    `Email:    ${msg.email}`,
    `Subject:  ${msg.subject}`,
    `Received: ${formatDate(msg.createdAt)}`,
    '',
    '— Message —',
    msg.message,
    '',
    `Reply to this email to answer ${msg.name} directly.`,
  ].join('\n');
}

export function contactEmailHtml(msg) {
  const name = esc(msg.name);
  const email = esc(msg.email);
  const subject = esc(msg.subject);
  const message = esc(msg.message).replace(/\r?\n/g, '<br>');
  const firstName = esc(String(msg.name).trim().split(/\s+/)[0] || msg.name);
  const replyHref = `mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`;

  const row = (label, value) => `
    <tr>
      <td style="padding:12px 0;border-top:1px solid ${C.line};width:110px;vertical-align:top;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${C.muted};">${label}</td>
      <td style="padding:12px 0;border-top:1px solid ${C.line};vertical-align:top;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink};">${value}</td>
    </tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${subject} — ${name}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
  <!-- Preview line shown in the inbox list -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name} wrote: ${esc(String(msg.message).slice(0, 110))}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:${C.panel};border-radius:20px 20px 0 0;padding:28px 32px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Logo = the name -->
                  <td style="vertical-align:middle;font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:3px;color:${C.panelText};">DR. KRISHAN AVTAR</td>
                  <td align="right" style="vertical-align:middle;font-family:${SANS};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${C.panelMuted};">Contact form</td>
                </tr>
              </table>
              <div style="height:22px;line-height:22px;">&nbsp;</div>
              <div style="font-family:${SERIF};font-size:30px;line-height:1.15;color:#FFFFFF;">New message from ${name}</div>
              <div style="height:12px;line-height:12px;">&nbsp;</div>
              <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:${C.peach};font-family:${SANS};font-size:12px;font-weight:700;color:${C.ink};">${subject}</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:24px 32px 8px;border-left:1px solid ${C.line};border-right:1px solid ${C.line};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${row('Name', name)}
                ${row('Email', `<a href="mailto:${email}" style="color:${C.panel};font-weight:700;text-decoration:underline;">${email}</a>`)}
                ${row('Subject', subject)}
                ${row('Received', esc(formatDate(msg.createdAt)))}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="background:#FFFFFF;padding:16px 32px 8px;border-left:1px solid ${C.line};border-right:1px solid ${C.line};">
              <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${C.peachText};padding-bottom:10px;">Message</div>
              <div style="background:${C.softPeach};border-left:4px solid ${C.peach};border-radius:0 16px 16px 0;padding:20px 22px;font-family:${SERIF};font-size:18px;line-height:1.6;color:${C.ink};">${message}</div>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td align="left" style="background:#FFFFFF;padding:22px 32px 30px;border-left:1px solid ${C.line};border-right:1px solid ${C.line};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:14px;background:${C.panel};">
                    <a href="${replyHref}" style="display:inline-block;padding:15px 26px;font-family:${SANS};font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:14px;">Reply to ${firstName} &rarr;</a>
                  </td>
                </tr>
              </table>
              <div style="padding-top:12px;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};">Or simply press <strong style="color:${C.body};">Reply</strong> in your email app — it goes straight to ${email}.</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${C.panel};border-radius:0 0 20px 20px;padding:18px 32px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.panelMuted};">
              Sent automatically by the contact form on <span style="color:${C.panelText};">krishanavtar.com</span>.<br>
              Understanding the Human Journey · Ancient Wisdom · Modern Science · Lived Experience
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
