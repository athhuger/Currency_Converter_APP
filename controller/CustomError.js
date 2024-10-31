class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static unauthorized(message = 'Unauthorized') {
    return new CustomError(401, message);
  }

  static notFound(message = 'Not Found') {
    return new CustomError(404, message);
  }
}

module.exports = CustomError;
