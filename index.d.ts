// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- as
import './jest/jest'

// Context
declare global {

  namespace Express {
    interface Request {
    }
  }
}

declare global {
  /**
   * Creates a compatible tuple from given literal string union type
   * the resulted type allow us usage on Mongo enum options and
   * Zod enum values.
   *
   *
   *
   * Zod usage example
   *
   * ```typescript
   * declare const CommonValues: SchemaEnumOptionsType<"private" | "public">
   * z.enum(CommonValues)
   * ```
   *
   * Mongo use case example
   *
   * ```typescript
   * declare const CommonValues: SchemaEnumOptionsType<"private" | "public">
   * new Schema<any, Model<any>>({
   *   example: { type: String, enum: CommonValues, default: 'public' },
   * })
   * ```
   */
  type SchemaEnumOptionsType<T extends string, U = Array<T>[0]> = [U, ...Exclude<T[], U>]
}
