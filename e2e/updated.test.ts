import { createTestRequest } from '../jest/jest.setupFileAfterEnv'
import { listItemsResponseSchema } from '../src/item/controllers/items.list'
import { ItemLean } from '../src/item/item.model'

describe('E2E Tests', () => {
  let testRequest: any

  beforeAll(() => {
    testRequest = createTestRequest()
  })

  it('should get a response with status code 200', async () => {
    // Arrange

    // Act
    const response = await testRequest.get('/ping')

    // Assert
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ ok: true })
  })

  describe('Basic Items functionality', () => {
    it('should be able to list all items', async () => {
      // Arrange
      const itemBody1 = {
        name: 'Item 1',
        price: 10
      }
      await testRequest.post('/items').send(itemBody1)

      // Act
      const response = await testRequest.get('/items')
      const { success } = listItemsResponseSchema.safeParse(response.body)

      // Assert
      expect(response.status).toBe(200)
      expect(success).toBe(true)
      expect(response.body.filter((item: ItemLean) => item.name === itemBody1.name)).toEqual([
        {
          _id: expect.any(String),
          name: 'Item 1',
          price: 10
        }
      ])
    })

    it('should be able to create a new item and get it by id', async () => {
      // Arrange
      const itemBody = {
        name: 'Item 1',
        price: 10
      }

      // Act
      const createResponse = await testRequest.post('/items').send(itemBody)
      const createdItemId = createResponse.body._id

      // Assert
      expect(createResponse.status).toBe(201)
      expect(createResponse.body).toEqual({
        _id: expect.any(String),
        name: 'Item 1',
        price: 10
      })

      // Act
      const getResponse = await testRequest.get(`/items/${createdItemId}`)

      // Assert
      expect(getResponse.status).toBe(200)
      expect(getResponse.body).toEqual({
        _id: createdItemId,
        name: 'Item 1',
        price: 10
      })
    })

    it('should be able to update an item', async () => {
      // Arrange
      const createResponse = await testRequest.post('/items').send({
        name: 'Item 1',
        price: 10
      })

      const createdItem = createResponse.body

      // Act
      const updateResponse = await testRequest.put(`/items/${createdItem._id}`).send({
        name: 'Item 1 updated',
        price: 20
      })

      // Assert
      expect(updateResponse.status).toBe(200)
      expect(updateResponse.body).toEqual({
        _id: createdItem._id,
        name: 'Item 1 updated',
        price: 20
      })

      const getResponse = await testRequest.get(`/items/${createdItem._id}`)
      expect(getResponse.status).toBe(200)
      expect(getResponse.body).toEqual({
        _id: createdItem._id,
        name: 'Item 1 updated',
        price: 20
      })
    })

    it('should be able to delete an item', async () => {
      const createResponse = await testRequest.post('/items').send({
        name: 'Item 1',
        price: 10
      })
      const createdItem = createResponse.body

      const deleteResponse = await testRequest.delete(`/items/${createdItem._id}`)
      expect(deleteResponse.status).toBe(204)

      const getResponse = await testRequest.get(`/items/${createdItem._id}`)
      expect(getResponse.status).toBe(404)
    })
  })

  describe('Validations', () => {
    it('should validate required fields', async () => {
      // Arrange
      const requestBody = {
        name: 'Item 1'
      }

      // Act
      const response = await testRequest.post('/items').send(requestBody)

      // Assert
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" is required'
          }
        ]
      })
    })

    it('should not allow for negative pricing for new items', async () => {
      // Arrange
      const requestBody = {
        name: 'Item 1',
        price: -10
      }

      // Act
      const response = await testRequest.post('/items').send(requestBody)

      // Assert
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative'
          }
        ]
      })
    })

    it('should not allow for negative pricing for updated items', async () => {
      // Arrange
      const createResponse = await testRequest.post('/items').send({
        name: 'Item 1',
        price: 10
      })
      const createdItem = createResponse.body
      const requestBody = {
        name: 'Item 1 updated',
        price: -20
      }

      // Act
      const updateResponse = await testRequest.put(`/items/${createdItem.id}`).send(requestBody)

      // Assert
      expect(updateResponse.status).toBe(400)
      expect(updateResponse.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative'
          }
        ]
      })
    })
  })
})
