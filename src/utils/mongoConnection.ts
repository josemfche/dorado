// mongo needs to be imported to satisfy `mongoConnection` return types
import mongoose, { connect, mongo as _mongo } from 'mongoose'
import { config } from './config'

export const mongoConnection = async () => {
  const options: mongoose.ConnectOptions = {
    dbName: 'eldorado',
    connectTimeoutMS: 30000,
  }

  const client = await connect(config.MONGO_URI, options)

  return client.connection.getClient()

}
