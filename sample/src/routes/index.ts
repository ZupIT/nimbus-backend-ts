import { Express } from 'express'
import { applyRoutes as applyOrderRoutes } from './order'
import { applyRoutes as applyProductRoutes } from './product'
import { applyRoutes as applyCartRoutes } from './cart'

export function applyRoutes(app: Express) {
  applyOrderRoutes(app)
  applyProductRoutes(app)
  applyCartRoutes(app)
}
