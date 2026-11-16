function sendSuccess(res, data = null, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function sendError(res, message = "Something went wrong", statusCode = 500, code = "INTERNAL_ERROR") {
  return res.status(statusCode).json({
    success: false,
    message,
    error: { code }
  });
}

module.exports = { sendSuccess, sendError };