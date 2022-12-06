import { AddressModel, Order, PaymentCard } from '../models/order'
import { getCart } from './cart'

let nextId = 1
const orders: Record<string, Order> = {}

export interface CreateOrderData {
  address: AddressModel,
  payment: PaymentCard,
}

export function createOrder({ address, payment }: CreateOrderData): Order[] {
  const id = `${nextId++}`
  const state = payment ? 'PAYMENT_ACCEPTED' : 'AWAITING_PAYMENT'
  const cart = getCart()
  const total = cart.products.reduce((total, current) => total + current.price * current.quantity, 0)
  const order: Order = { id, products: cart.products, address, state, total }
  console.log('Created order:', order)
  console.log('-------')
  console.log('Payment:', payment)
  console.log('-------')
  orders[`${id}`] = { ...order, id }
  return listOrders()
}

export function getOrderById(id: number): Order | undefined {
  return orders[`${id}`]
}

export function listOrders(): Order[] {
  return Object.keys(orders).map(key => orders[key]).reverse()
}
