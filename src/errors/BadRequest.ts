/**
 * When a client sends a malformed or bad request to the server.
 */
export class BadRequest extends Error {
  status: number
  logMetrics: boolean

  constructor(message?: string) {
    super(message || 'The request is malformed or invalid.')
    this.name = 'BadRequest'
    this.status = 400
    this.logMetrics = true
  }
}
