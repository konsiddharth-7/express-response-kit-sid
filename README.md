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

Install the package using npm:

```bash
npm install express-response-kit-sid
```

## Usage

Import the functions you need from the package:

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

Generates pagination metadata based on the total number of records, current page, and page limit.

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

Wraps asynchronous Express route handlers and forwards errors to the error-handling middleware.

```javascript
app.get("/data", asyncHandler(async (req, res) => {
  const data = await getData();

  sendSuccess(res, data, "Data retrieved");
}));
```

### 6. errorHandler()

Provides centralized Express error handling.

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

app.use(express.json());

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

Clone the repository:

```bash
git clone https://github.com/konsiddharth-7/express-response-kit-sid.git
cd express-response-kit-sid
```

Install the development dependencies:

```bash
npm install
```

Run the automated test suite:

```bash
npm test
```

The test suite uses Jest to verify the functionality of the package.

### Test Coverage

The tests cover:

- Standardized success response formatting
- Standardized error response formatting
- Pagination metadata calculations
- Paginated response generation
- Async error handling
- Express error middleware behavior

### Expected Test Results

The test suite should complete successfully with output similar to:

```text
PASS test/pagination.test.js
PASS test/response.test.js
PASS test/middleware.test.js

Test Suites: 3 passed, 3 total
Tests: 9 passed, 9 total
```

## Project Structure

```text
express-response-kit-sid/
├── examples/
│   └── express-app.js
├── src/
│   ├── asyncHandler.js
│   ├── error.js
│   ├── pagination.js
│   └── response.js
├── test/
│   ├── middleware.test.js
│   ├── pagination.test.js
│   └── response.test.js
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## npm Package

Published package:

https://www.npmjs.com/package/express-response-kit-sid

## GitHub Repository

https://github.com/konsiddharth-7/express-response-kit-sid

## License

ISC
