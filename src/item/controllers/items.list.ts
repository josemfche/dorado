import { Request, Response } from 'express'
import { z } from 'zod'
import { Item } from '../item.model'

export const listItemsResponseSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number()
  })
)

// types used to help frontend with autocomplete and type safety
export type ListItemsReturn = z.infer<typeof listItemsResponseSchema>

export default async function listItems (req: Request, res: Response<ListItemsReturn>) {

  const items = await Item.find({}, { _id: 1, name: 1, price: 1 }).lean()

  res.json(items)
}
