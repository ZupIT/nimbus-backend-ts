import { Expression } from '@zup-it/nimbus-backend-core'
import { log, request, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Cart } from '../../models/cart'
import { globalState } from '../global-state'

export const addToCart = (productId: Expression<number>) => sendRequest<Cart>({
  url: '/data/cart',
  method: 'Put',
  data: { productId },
  onSuccess: (response) => globalState.get('cart').set(response.get('data')),
  onError: (response) => log({ message: response.get('message'), level: 'error' })
})

export const getCart = request<Cart>()
  .compose(() => ({ url: '/data/cart' }))

export const clearCart = request<Cart>()
  .compose(() => ({ url: '/data/cart', method: 'Delete' }))
