import express from 'express'

import getItem from './controllers/item.get'
import listItems from './controllers/items.list'
import createItem from './controllers/item.post'
import updateItem from './controllers/item.update'
import deleteItem from './controllers/item.delete'

const itemRoutes = express.Router()

// GET
itemRoutes.get('/', listItems)
itemRoutes.get('/:id', getItem)

// POST
itemRoutes.post('/', createItem)

// PUT
itemRoutes.put('/:id', updateItem)

// DELETE
itemRoutes.delete('/:id', deleteItem)

export default itemRoutes
