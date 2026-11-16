
function paginationMeta(total, page, limit) {
  if (!Number.isInteger(total) || total < 0) {
    throw new Error("Total must be a non-negative integer");
  }

  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be a positive integer");
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Limit must be a positive integer");
  }

  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}

function sendPaginated(
  res,
  data,
  total,
  page,
  limit,
  message = "Data retrieved successfully"
) {
  const meta = paginationMeta(total, page, limit);

  return res.status(200).json({
    success: true,
    message,
    data,
    meta
  });
}

module.exports = {
  paginationMeta,
  sendPaginated
};
