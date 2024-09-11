import { Request, Response } from 'express'
import { z } from 'zod'
import { Item } from '../item.model'
import { NotFoundError } from '../../errors'

export const getItemParamsSchema = z.object({
  id: z.string()
})

export const getItemResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number()
})

// types used to help frontend with autocomplete and type safety
export type GetItemReturn = z.infer<typeof getItemResponseSchema>

export default async function getItem (req: Request, res: Response<GetItemReturn>) {
  const { id } = getItemParamsSchema.parse(req.params)

  // using projections and .lean() to improve performance
  const item = await Item.findById(id, { _id: 1, name: 1, price: 1 }).lean()

  if (!item) {
    throw new NotFoundError('Item not found')
  }

  res.status(200).json(item)
}
