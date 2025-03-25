const errorMiddleware = (err, req, res, next) => {
  console.error(`🔥 Error: ${err.message || err}`); // Log for debugging

  let errorMessage = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  // 🛑 Mongoose Validation Error (Missing Fields, Invalid Format)
  if (err.name === "ValidationError") {
    errorMessage.statusCode = 400;
    errorMessage.message = Object.values(err.errors)
      .map((eachErr) => eachErr.message)
      .join(", ");
  }

  // 🚫 Mongoose Duplicate Key Error (e.g., Unique Email Violation)
  if (err.code && err.code === 11000) {
    errorMessage.statusCode = 400;
    errorMessage.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }

  // 🛑 JSON Web Token (JWT) Error Handling
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    errorMessage.statusCode = 401;
    errorMessage.message = "Invalid or expired token, please log in again";
  }

  res
    .status(errorMessage.statusCode)
    .json({ success: false, message: errorMessage.message });
};

export default errorMiddleware;
