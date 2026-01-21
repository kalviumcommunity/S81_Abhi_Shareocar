/**
 * Wraps an async controller function to handle errors automatically.
 * Eliminates the need for try-catch blocks in every controller.
 *
 * @param {Function} fn - Async controller function (req, res, next)
 * @returns {Function} Express middleware with error handling
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom application error class with status code support.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.status = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Creates a 404 Not Found error.
 */
export const notFound = (resource = 'Resource') => {
  return new AppError(`${resource} not found`, 404);
};

/**
 * Creates a 403 Forbidden error.
 */
export const forbidden = (message = 'Access denied') => {
  return new AppError(message, 403);
};

/**
 * Creates a 400 Bad Request error.
 */
export const badRequest = (message = 'Bad request') => {
  return new AppError(message, 400);
};
