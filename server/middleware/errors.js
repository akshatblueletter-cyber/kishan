// Unknown /api routes.
export function notFound(req, res) {
  res.status(404).json({ message: 'Not found' });
}

// Every error ends here: log it, never leak internals to the visitor.
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  // Body too large or not valid JSON
  if (err.type === 'entity.too.large') return res.status(413).json({ message: 'Request is too large.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid request body.' });

  // Mongoose validation (should normally be caught earlier by our own checks)
  if (err.name === 'ValidationError') return res.status(400).json({ message: 'Please check the form and try again.' });

  console.error(`❌ ${req.method} ${req.originalUrl}:`, err);
  res.status(err.status || 500).json({ message: 'Something went wrong. Please try again later.' });
}
