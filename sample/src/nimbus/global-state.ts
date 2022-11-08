import { getGlobalState } from '@zup-it/nimbus-backend-core'
import { AddressModel, Order } from '../models/order'
import { Product } from '../models/product'

export interface GlobalState {
  cart: Product[],
  address: AddressModel,
}

export const globalState = getGlobalState<GlobalState>()
