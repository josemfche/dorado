import { ObjectId, Types } from 'mongoose'

/**
 * Converts mongoose documents to dev-friendly types by
 * turning all ObjectID keys into string keys.
 *
 */
export type StringifyIDs<Document> =
  // If `Document` is an ObjectId, replace it with a string
  Document extends Types.ObjectId | ObjectId
    ? string
    : // If `Document` is a date, return Date
      Document extends Date
      ? Date
      : // If `Document` is an object, recursively map over its properties and apply `StringifyIDs` to each
        Document extends object
        ? { [Key in keyof Document]: StringifyIDs<Document[Key]> }
        : // If `Document` is neither an ObjectId nor an object, leave it unchanged
          Document
