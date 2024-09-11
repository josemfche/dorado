import dotenv from 'dotenv'
dotenv.config({ path: `.env.local` })
dotenv.config()

import './utils/sentry'

import { config } from './utils/config'

import app from './server'

app.listen(config.PORT, () => {
  if (config.NODE_ENV === 'production') {
    console.log('Server is running 🌈 http://localhost:3000')
  }

  console.log(`Server is running http://localhost:${config.PORT}`)
})
