import { Request, Response } from 'express'
import { z } from 'zod'
import { Item } from '../item.model'

export const updateItemParamsSchema = z.object({
  id: z.string()
})

export const updateItemBodySchema = z.object({
  name: z.string(),
  price: z.number()
})

export const updateItemResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number().min(0, { message: 'Field "price" cannot be negative' })
})

// types used to help frontend with autocomplete and type safety
export type UpdateItemReturn = z.infer<typeof updateItemResponseSchema>
export type UpdateItemParams = z.infer<typeof updateItemParamsSchema>
export type UpdateItemBody = z.infer<typeof updateItemBodySchema>

export default async function updateItem (
  req: Request<UpdateItemParams, {}, UpdateItemBody>,
  res: Response<UpdateItemReturn>
) {
  const { name, price } = updateItemBodySchema.parse(req.body)
  const { id } = updateItemParamsSchema.parse(req.params)

  if (price < 0) {
    throw new z.ZodError([
      { path: ['price'], message: 'Field "price" cannot be negative', code: 'custom' }
    ])
  }


  const item = await Item.findByIdAndUpdate(id, { name, price }, { new: true })

  if (!item) {
    throw new Error('Item not found')
  }

  res.status(200).json({
    _id: item._id,
    name: item.name,
    price: item.price
  })
}
