import { request } from '@zup-it/nimbus-backend-core/actions'
import { Product } from '../../models/product'
import { baseUrl } from '../constants'

export const listProducts = request<Product[]>()
  .compose(() => ({ url: `${baseUrl}/products` }))
