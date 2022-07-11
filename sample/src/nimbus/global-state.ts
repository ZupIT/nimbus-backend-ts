import { getGlobalState } from '@zup-it/nimbus-backend-core'
import { Address } from '../models/order'
import { Product } from '../models/product'

export interface GlobalState {
  cart: Product[],
  currentProduct?: Product,
  address: Address,
}

export const globalState = getGlobalState<GlobalState>()
