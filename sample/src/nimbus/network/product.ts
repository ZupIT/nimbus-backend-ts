import { request } from '@zup-it/nimbus-backend-core/actions'
import { Product } from '../../models/product'

export const listProducts = request<Product[]>()
  .compose(() => ({ url: '/data/products' }))
