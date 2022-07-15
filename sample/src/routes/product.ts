import { Express } from 'express';
import { listProductsController } from '../controllers/product'

export function applyRoutes(app: Express) {
  app.get('/data/products', (_, res) => listProductsController(res))
}
