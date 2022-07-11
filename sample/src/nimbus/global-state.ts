import { getGlobalState } from '@zup-it/nimbus-backend-core'
import { AddressModel } from '../models/order'
import { Product } from '../models/product'

export interface GlobalState {
  cart: Product[],
  currentProduct?: Product,
  address: AddressModel,
}

export const globalState = getGlobalState<GlobalState>()
