import { Types } from 'mongoose'

export const OID = (id?: string) => {
  return new Types.ObjectId(id)
}

export function buildItem (name: string, price: number) {
  return {
    _id: OID().toString(),
    name,
    price
  }
}

export const item = buildItem('First item', 1)
export const item1 = buildItem('Second item', 2)
export const item2 = buildItem('Third item', 3)
export const item3 = buildItem('Fourth item', 4)
export const item4 = buildItem('Fifth item', 5)
