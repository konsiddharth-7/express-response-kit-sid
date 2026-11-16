const { sendSuccess, sendError } = require("../src/response");

describe("Response utilities", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  test("sends a success response", () => {
    sendSuccess(res, { name: "Sid" }, "User retrieved");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User retrieved",
      data: { name: "Sid" }
    });
  });

  test("sends an error response", () => {
    sendError(res, "Not found", 404, "NOT_FOUND");

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not found",
      error: { code: "NOT_FOUND" }
    });
  });
});