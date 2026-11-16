
const { paginationMeta, sendPaginated } = require("../src/pagination");

describe("Pagination utilities", () => {
  test("generates pagination metadata", () => {
    expect(paginationMeta(100, 2, 10)).toEqual({
      page: 2,
      limit: 10,
      total: 100,
      totalPages: 10,
      hasNextPage: true,
      hasPreviousPage: true
    });
  });

  test("sends paginated response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    sendPaginated(res, [{ id: 1 }], 20, 1, 10);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Data retrieved successfully",
      data: [{ id: 1 }],
      meta: {
        page: 1,
        limit: 10,
        total: 20,
        totalPages: 2,
        hasNextPage: true,
        hasPreviousPage: false
      }
    });
  });

  test("rejects an invalid page number", () => {
    expect(() => paginationMeta(100, 0, 10)).toThrow(
      "Page must be a positive integer"
    );
  });

  test("rejects an invalid limit", () => {
    expect(() => paginationMeta(100, 1, 0)).toThrow(
      "Limit must be a positive integer"
    );
  });

  test("rejects a negative total", () => {
    expect(() => paginationMeta(-10, 1, 10)).toThrow(
      "Total must be a non-negative integer"
    );
  });
});
