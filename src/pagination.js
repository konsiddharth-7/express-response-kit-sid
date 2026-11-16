function paginationMeta(total, page, limit) {
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

function sendPaginated(res, data, total, page, limit, message = "Data retrieved successfully") {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: paginationMeta(total, page, limit)
  });
}

module.exports = { paginationMeta, sendPaginated };