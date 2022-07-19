import { Express } from 'express'
import { createOrderController, getOrderController, listOrdersController } from '../controllers/order'

export function applyRoutes(app: Express) {
  app.get('/data/orders', (_, res) => listOrdersController(res))
  app.post('/order', createOrderController)
  app.get('/order/:id', getOrderController)
}
