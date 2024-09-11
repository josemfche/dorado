/**
 * When an unexpected server error occurs.
 *
 * We should NEVER pass InternalServerError(err.message).
 */
export class InternalServerError extends Error {
  status: number
  logMetrics: boolean
  cause?: Error

  constructor(message: string, cause?: Error) {
    super(message || 'An internal server error occurred.')
    this.name = 'InternalServerError'
    this.status = 500
    this.cause = cause
    this.logMetrics = true
  }
}
