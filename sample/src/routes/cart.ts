import { Express } from 'express'
import { addToCartController, clearCartController, getCartController } from '../controllers/cart'

export function applyRoutes(app: Express) {
  app.get('/data/cart', (_, res) => getCartController(res))
  app.put('/data/cart', addToCartController)
  app.delete('/data/cart', (_, res) => clearCartController(res))
}
