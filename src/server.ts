// eliminates the necessity of using try catch blocks for async functions
import 'express-async-errors'
import './utils/mongoosePlugins'

import express from 'express'
import morgan from 'morgan'
import rootRouter from './routes'
import { globalErrorHandler } from './middleware/globalErrorHandler'
import { config } from './utils/config'
import { mongoConnection } from './utils/mongoConnection'

mongoConnection()

export const app = express()

const morganOption = config.NODE_ENV === 'production' ? 'tiny' : 'common'

if (config.NODE_ENV !== 'test') {
  app.use(morgan(morganOption))
}

app.disable('x-powered-by')
app.use(express.json())


app.use('/ping', (req, res) => {
  res.json({ ok: true })
})
app.use('/', rootRouter)


app.use(globalErrorHandler)

export default app
