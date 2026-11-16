function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      code: err.code || "INTERNAL_ERROR"
    }
  });
}

module.exports = errorHandler;