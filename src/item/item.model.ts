import { Schema, model, Document, Model } from 'mongoose'
import { StringifyIDs } from '../utils/stringifyIDs'

export interface Item {
  _id: string
  name: string
  price: number
}

export type ItemLean = StringifyIDs<Item>

interface ItemDocument extends Omit<Document, '_id'>, Item {}

export const ItemSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    shardKey: {
      _id: 'hashed'
    }
  }
)

export const Item = model<ItemDocument, Model<Item>>('Item', ItemSchema)
