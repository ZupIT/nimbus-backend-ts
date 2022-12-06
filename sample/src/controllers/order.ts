import { Request, Response } from 'express'
import { clearCart } from '../services/cart'
import { createOrder, CreateOrderData, getOrderById, listOrders } from '../services/order'

export async function createOrderController(request: Request<unknown, unknown, CreateOrderData>, response: Response) {
  try {
    const payload = request.body
    if (!payload?.address || !payload?.payment) {
      throw Error(
        `You need to send address and payment in the payload.
        Found: ${payload ? Object.keys(payload) : 'nothing'}.`
      )
    }
    const orders = createOrder(request.body || {})
    clearCart()
    response.status(201).send(orders)
  } catch (err) {
    response.status(500).send({ error: `${err}` })
  }
}

export async function getOrderController(request: Request<{ id: number }>, response: Response) {
  await new Promise(resolve => setTimeout(resolve, 500))
  const order = getOrderById(request.params.id)
  if (!order) {
    response.status(404).send()
    return
  }
  response.status(200).send(order)
}

export async function listOrdersController(response: Response) {
  await new Promise(resolve => setTimeout(resolve, 300))
  response.status(200).send(listOrders())
}
