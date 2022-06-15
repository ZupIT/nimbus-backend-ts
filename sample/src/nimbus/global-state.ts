import { getGlobalState } from '@zup-it/nimbus-backend-core'
import { Product } from '../models/product'

export interface GlobalState {
  cart: Product[]
}

export const globalState = getGlobalState<GlobalState>()
