import mongoose, { MongooseDistinctQueryMiddleware, ObjectId, Schema, Types } from 'mongoose'

// ensures all returns for object ID get turned
// into strings before entering our logic
mongoose.Schema.Types.ObjectId.get((value?: ObjectId | null) => {
  return value?.toString() || value
})

// this ensures the same for aggregates
/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- result is a generic object */
function stringifyAllObjectIds(result: any) {
  if (result instanceof Types.ObjectId) {
    return result.toString()
  }

  if (Array.isArray(result)) {
    result = result.map((doc) => stringifyAllObjectIds(doc))
    return result
  }

  if (typeof result === 'object') {
    for (const key in result) {
      result[key] = stringifyAllObjectIds(result[key])
    }
    return result
  }

  return result
}

/**
 * implementation inspired by:
 *  - https://github.com/mongoosejs/mongoose-lean-getters/blob/master/index.js
 *  - https://github.com/Automattic/mongoose/issues/10423#issuecomment-904776874
 *
 * mongoose's toObject() and toJSON() still return object IDs.
 * this plugin stringifies all those object IDs
 *
 * WARNING: do NOT define any post hooks for any models
 * or these transformers will be overridden and will not run
 */
function stringifyTransformers(schema: Schema) {
  schema.set('toObject', {
    // removes the extra `id` key so we can keep only `_id`
    // also stringifies all `_id`s
    transform: (doc) => doc.toJSON()
  })
  schema.set('toJSON', { flattenObjectIds: true })

  // needed to stringify object IDs for .lean()
  // since .lean() does not run getters like the one
  // defined at the top of this file for object IDs
  schema.post(
    [
      'find',
      'findOne',
      'findOneAndDelete',
      'findOneAndReplace',
      'findOneAndUpdate',
      'insertMany',
      'replaceOne',
      'save',
      'update',
      'updateOne',
      'updateMany'
    ] as MongooseDistinctQueryMiddleware[],
    function (res) {
      if (!res || !this.mongooseOptions || !this.mongooseOptions().lean) {
        return
      }
      stringifyAllObjectIds(res)
    }
  )
}

// mongoose aggregates still have object IDs
// this plugin stringifies all those object IDs
function mapAggregateResults(schema: Schema) {
  schema.post('aggregate', stringifyAllObjectIds)
}

// https://mongoosejs.com/docs/guide.html#strictQuery
function enableStrictMode(schema: Schema) {
  schema.set('strictQuery', false) // turn off strict mode for query filters
  schema.set('strict', true)
}

mongoose.plugin(stringifyTransformers)
mongoose.plugin(mapAggregateResults)
mongoose.plugin(enableStrictMode)
