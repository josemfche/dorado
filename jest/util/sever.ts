import type { Express } from 'express'
import http from 'http'

export function createAppServer(app: Express): http.Server {
  const server = http.createServer(app)
  server.timeout = 15_000
  server.unref()

  return server.listen(0)
}

export async function closeAppServer(server: http.Server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        return reject(error)
      }
      resolve(null)
    })
  })
}
