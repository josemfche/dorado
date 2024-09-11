import { Request, Response, NextFunction } from 'express'
import { config } from '../utils/config'
import { z } from 'zod'
import { BadRequest } from '../errors/BadRequest'
import { InternalServerError } from '../errors/InternalServerError'
import { coerceError } from '../errors/coerceError'
import { NotFoundError } from '../errors'

// this type should always match the debugData properties for production errors
export type ErrorType = {
  message: string
  error: {
    name?: string
  }
}

export const globalErrorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const coercedError = coerceError(error)

  // don't share sensitive debugging data when in production
  const isProduction = config.NODE_ENV === 'production'
  const isTest = config.NODE_ENV === 'test'

  // log to console locally for debugging
  if (!isProduction && !isTest) {
    console.error(coercedError)
  }

  if (coercedError instanceof z.ZodError) {
    // Handle validation error
    return res.status(400).json({
      errors: [
        {
          field: coercedError.issues[0].path[0],
          message: coercedError.issues[0].message
        }
      ]
    })
  }

  switch (true) {
    case coercedError instanceof BadRequest:
    case coercedError instanceof InternalServerError:
    case coercedError instanceof NotFoundError:
      res.status(coercedError.status).json({ message: coercedError.message, error: coercedError })
      return
    default:
      // unexpected 500 errors
      res.status(500).json({
        message: isProduction ? 'Oops. Something went wrong.' : coercedError.message,
        error: coercedError
      })
  }
}
