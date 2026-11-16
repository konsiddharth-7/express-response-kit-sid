
const express = require("express");

const {
  sendSuccess,
  sendError,
  sendPaginated,
  asyncHandler,
  errorHandler
} = require("../index");

const app = express();

app.use(express.json());

const students = [
  { id: 1, name: "Rahul", course: "Computer Science" },
  { id: 2, name: "Priya", course: "Information Technology" },
  { id: 3, name: "Arjun", course: "Computer Science" },
  { id: 4, name: "Sneha", course: "Electronics" }
];

app.get("/", (req, res) => {
  sendSuccess(res, { status: "API is running" }, "Welcome");
});

app.get("/students", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;

  const start = (page - 1) * limit;
  const paginatedStudents = students.slice(start, start + limit);

  sendPaginated(res, paginatedStudents, students.length, page, limit);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!student) {
    return sendError(res, "Student not found", 404, "NOT_FOUND");
  }

  sendSuccess(res, student, "Student retrieved successfully");
});

app.get("/error", asyncHandler(async (req, res) => {
  throw new Error("Example error");
}));

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Example server running at http://localhost:${PORT}`);
});
