// middleware/errorMiddleware.js

// Runs when no route matched the request
function notFoundHandler(req, res) {
  res.status(404).render('errors/404');
}

// Runs when any route handler throws an error or calls next(err)
function globalErrorHandler(err, req, res, next) {
  console.error('Unexpected error:', err); // full details go to the server log, not the browser

  // If the request was to our API, respond with JSON, not an HTML page
  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }

  res.status(500).render('errors/500');
}

module.exports = { notFoundHandler, globalErrorHandler };
