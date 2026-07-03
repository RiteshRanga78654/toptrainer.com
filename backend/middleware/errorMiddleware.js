const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  let statusCode = err.statusCode || 500;
  let message =
    err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Resource not found. Invalid ID`;
  }

  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(
      err.keyValue
    )[0];

    message = `${field} already exists`;
  }

  if (err.name === "ValidationError") {

    statusCode = 400;

    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }


  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please login again";
  }


  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File size exceeds limit";
  }

  res.status(statusCode).json({
    success: false,
    message,

    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorMiddleware;