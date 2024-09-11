import { Request, Response } from 'express'
import { z } from 'zod'
import { Item } from '../item.model'
import { NotFoundError } from '../../errors'

export const deleteItemParamsSchema = z.object({
  id: z.string()
})

// types used to help frontend with autocomplete and type safety
export type DeleteItemParams = z.infer<typeof deleteItemParamsSchema>

export default async function getItem (req: Request<DeleteItemParams>, res: Response) {
  const { id } = deleteItemParamsSchema.parse(req.params)

  const item = await Item.findByIdAndDelete(id)

  if (!item) {
    throw new NotFoundError('Item not found')
  }

  res.status(204).send()
}
