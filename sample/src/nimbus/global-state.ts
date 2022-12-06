import { getGlobalState } from '@zup-it/nimbus-backend-core'
import { Cart } from '../models/cart'
import { Order } from '../models/order'

export interface GlobalState {
  cart: Cart,
  orders: Order[],
}

export const globalState = getGlobalState<GlobalState>()
