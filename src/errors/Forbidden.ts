/**
 * When a client has valid credentials but not enough privileges to perform an action on a resource.
 */
export class Forbidden extends Error {
  status: number
  logMetrics: boolean

  constructor(message?: string) {
    super(message || 'You do not have access to this resource.')
    this.name = 'Forbidden'
    this.status = 403
    this.logMetrics = true
  }
}
