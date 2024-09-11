/**
 * When a document doesn't exist.
 */
export class NotFoundError extends Error {
  status: number
  logMetrics: boolean

  constructor(message?: string) {
    super(message || 'This item could not be found.')
    this.name = 'NotFoundError'
    this.status = 404
    this.logMetrics = true
  }
}
