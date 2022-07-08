import { RouteMap } from '@zup-it/nimbus-backend-express'
import { Welcome } from './welcome'
import { Products } from './products'
import { Product } from './product'
import { Order } from './order'
import { Cart } from './cart'
import { Address } from './address'
import { Payment } from './payment'

export const routes: RouteMap = {
  '/products': Products,
  '/product': Product,
  '/cart': Cart,
  '/address': Address,
  '/payment': Payment,
  '/order/:id': Order,
  '/welcome': Welcome,
}
