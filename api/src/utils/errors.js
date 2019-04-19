/**
 * Use these errors in your business logic to have proper status codes
 * in the HTTP responses
 */

export class BadRequest extends Error {
  get httpStatusCode() {
    return 400
  }
}

export class Unauthorized extends Error {
  get httpStatusCode() {
    return 401
  }
}

export class Forbidden extends Error {
  get httpStatusCode() {
    return 403
  }
}

export class NotFound extends Error {
  get httpStatusCode() {
    return 404
  }
}

export const asyncMiddleware = middleware => {
  const wrap = async(req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (err) {
      next(err)
    }
  }
  return wrap
}

export const apiErrorHandler = (err, req, res, next) => {
  const statusCode = err.httpStatusCode || 500
  res.status(statusCode).json({ error: err.message || String(err) })
}
