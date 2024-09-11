import { default as mongoose } from 'mongoose'
import { Item } from '../src/item/item.model'

import { item, item1, item2, item3, item4 } from './fixtures/item'

export async function seedDB () {
  await Promise.all([Item.create(item, item1, item2, item3, item4)])
}
export async function clearDB () {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db?.dropDatabase()
  } else {
    console.error('Database connection is not open')
  }
}
