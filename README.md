
# Express Response Kit

A lightweight Express.js toolkit for creating standardized API responses, handling errors, and managing pagination.

## Features

- Standardized success responses
- Standardized error responses
- Pagination metadata
- Paginated API responses
- Async route error handling
- Centralized Express error middleware

## Installation

```bash
npm install express-response-kit-sid
```

## Usage

Import the required functions:

```javascript
const {
  sendSuccess,
  sendError,
  paginationMeta,
  sendPaginated,
  asyncHandler,
  errorHandler
} = require("express-response-kit-sid");
```

## Available Functions

### 1. sendSuccess()

Sends a standardized success response.

```javascript
app.get("/users", (req, res) => {
  sendSuccess(res, [{ id: 1, name: "Sid" }], "Users retrieved");
});
```

### 2. sendError()

Sends a standardized error response.

```javascript
app.get("/users/:id", (req, res) => {
  sendError(res, "User not found", 404, "NOT_FOUND");
});
```

### 3. paginationMeta()

Generates pagination metadata.

```javascript
const meta = paginationMeta(100, 2, 10);

console.log(meta);
```

The result includes:

- Current page
- Page limit
- Total records
- Total pages
- Whether a next page exists
- Whether a previous page exists

### 4. sendPaginated()

Sends data along with pagination metadata.

```javascript
app.get("/users", (req, res) => {
  const users = [{ id: 1, name: "Sid" }];

  sendPaginated(res, users, 100, 1, 10);
});
```

### 5. asyncHandler()

Forwards errors from asynchronous Express route handlers to error middleware.

```javascript
app.get("/data", asyncHandler(async (req, res) => {
  const data = await getData();

  sendSuccess(res, data, "Data retrieved");
}));
```

### 6. errorHandler()

Centralized Express error-handling middleware.

Register it after your routes:

```javascript
app.use(errorHandler);
```

## Complete Express Example

```javascript
const express = require("express");

const {
  sendSuccess,
  sendError,
  sendPaginated,
  asyncHandler,
  errorHandler
} = require("express-response-kit-sid");

const app = express();

app.get("/", (req, res) => {
  sendSuccess(res, { status: "running" }, "Welcome");
});

app.get("/error", asyncHandler(async (req, res) => {
  throw new Error("Example error");
}));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Running Tests

Clone the repository and install development dependencies:

```bash
npm install
```

Run the automated tests:

```bash
npm test
```

## Project Structure

```text
express-response-kit/
├── src/
│   ├── response.js
│   ├── pagination.js
│   ├── asyncHandler.js
│   └── error.js
├── test/
│   ├── response.test.js
│   ├── pagination.test.js
│   └── middleware.test.js
├── examples/
│   └── express-app.js
├── index.js
├── package.json
└── README.md
```

## License

ISC
