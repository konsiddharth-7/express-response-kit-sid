const asyncHandler = require("../src/asyncHandler");
const errorHandler = require("../src/error");

describe("Middleware utilities", () => {
  test("asyncHandler forwards errors", async () => {
    const next = jest.fn();
    const error = new Error("Test error");

    const handler = asyncHandler(async () => {
      throw error;
    });

    await handler({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test("errorHandler sends error response", () => {
    const res = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    errorHandler(new Error("Not found"), {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not found",
      error: { code: "INTERNAL_ERROR" }
    });
  });
});
