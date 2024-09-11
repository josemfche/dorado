/* eslint-disable no-undef -- for some reason eslint is not picking up on the jest global*/

/**
 * This file runs at the beginning of EACH test file.
 * This file sets up and tears before each test suite.
 *
 * More info: https://jestjs.io/docs/configuration#setupfilesafterenv-array
 */

import { config } from 'dotenv'
import { Server } from 'http'
import mongoose from 'mongoose'
import requestSuperTest from 'supertest'

config({ path: `.env` })
// !Important: application must be imported before all
import doradoApp from '../src/server'

import { clearDB, seedDB } from './seedUtil'
import { createAppServer, closeAppServer } from './util/sever'

/**
 * !IMportant: this hack is for mock cloud storage and must be here before any other mocking
 */
Object.assign(global, {
  MOCK_CLOUD_STORAGE: []
})

let connection: typeof mongoose
let application: Server

beforeAll(async () => {
  connection = await mongoose.connect(
    process.env.MONGO_URI || 'mongodb://mongodb:27017/eldorado',
    {}
  )
  await seedDB()
  console.log('Database seeded')

  application = createAppServer(doradoApp)

})

beforeEach(async () => {
  await clearDB()
  await seedDB()
})

afterAll(async () => {
  await closeAppServer(application)
  await connection.disconnect()
  console.log('Database disconnected')
})

export const createTestRequest = () => {
  return requestSuperTest(application)
}
