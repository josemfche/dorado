// mongo needs to be imported to satisfy `mongoConnection` return types
import mongoose, { connect, Types, mongo as _mongo } from 'mongoose'
import { config } from './config'

export const mongoConnection = async () => {
  const options: mongoose.ConnectOptions = {
    authMechanism: 'SCRAM-SHA-1',
    authSource: 'admin',
    dbName: 'eldorado',
    user: 'root',
    connectTimeoutMS: 30000,
    pass: config.MONGO_PASSWORD
  }

  const client = await connect(config.MONGO_URI, options)

  return client.connection.getClient()
}
