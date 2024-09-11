import { Router } from 'express'
import itemRoutes from './item/item.routes'

const rootRouter = Router()

rootRouter.use('/items', itemRoutes)

export default rootRouter
