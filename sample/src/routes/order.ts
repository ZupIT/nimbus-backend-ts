import { Express } from 'express'
import { createOrderController, getOrderController, listOrdersController } from '../controllers/order'

export function applyRoutes(app: Express) {
  app.get('/data/orders', (_, res) => listOrdersController(res))
  app.post('/data/order', createOrderController)
  app.get('/data/order/:id', getOrderController)
}
