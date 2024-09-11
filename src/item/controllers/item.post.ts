import { Request, Response } from 'express'
import { z } from 'zod'
import { Item } from '../item.model'

export const createItemSchema = z.object({
  name: z.string(),
  price: z.number({
    required_error: 'Field "price" is required'
  })
})

export const createItemResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number()
})

// types used to help frontend with autocomplete and type safety
export type CreateItemReturn = z.infer<typeof createItemResponseSchema>

export default async function createItem (req: Request, res: Response<CreateItemReturn>) {
  const { name, price } = createItemSchema.parse(req.body)

  if (price < 0) {
    throw new z.ZodError([
      { path: ['price'], message: 'Field "price" cannot be negative', code: 'custom' }
    ])
  }

  const item = await Item.create({ name, price })

  res.status(201).json({
    _id: item._id,
    name: item.name,
    price: item.price
  })
}
