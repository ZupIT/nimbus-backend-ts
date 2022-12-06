import { DeepExpression, Expression } from '@zup-it/nimbus-backend-core'
import { request } from '@zup-it/nimbus-backend-core/actions'
import { Order } from '../../models/order'
import { CreateOrderData } from '../../services/order'

interface CreateOrderError {
  error: string,
}

interface CreateOptions {
  data: DeepExpression<CreateOrderData>
}

interface GetByIdOptions {
  id: Expression<string>,
}

export const createOrder = request<Order[], CreateOrderError>()
  .compose(({ data }: CreateOptions) => ({ url: '/data/order', method: 'Post', data }))

export const getOrderById = request<Order>()
  .compose(({ id }: GetByIdOptions) => ({ url: '/data/order/${id}' }))

export const listOrders = request<Order[]>()
  .compose(() => ({ url: '/data/orders' }))
