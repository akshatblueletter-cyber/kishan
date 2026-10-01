import rateLimit from 'express-rate-limit';

const message = (text) => ({ message: text });

// General protection for the whole API (generous: normal browsing never hits it).
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: message('Too many requests. Please try again in a few minutes.'),
});

// Contact form: at most 5 messages per hour from the same visitor (spam protection).
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: message('Too many messages were sent. Please try again later.'),
});

// Search: 60 searches per minute per visitor.
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: message('Too many searches. Please wait a moment.'),
});
