import { Request, Response } from 'express'
import { addToCart, clearCart, getCart } from '../services/cart'

export interface AddToCartBody {
  productId: number,
}

export async function addToCartController(request: Request<unknown, unknown, AddToCartBody>, response: Response) {
  await new Promise(resolve => setTimeout(resolve, 200))
  try {
    const productId = request.body.productId
    const cart = addToCart(productId)
    response.status(200).send(cart)
  } catch {
    response.status(400)
  }
}

export async function getCartController(response: Response) {
  await new Promise(resolve => setTimeout(resolve, 200))
  response.status(200).send(getCart())
}

export async function clearCartController(response: Response) {
  await new Promise(resolve => setTimeout(resolve, 200))
  const cart = clearCart()
  response.status(200).send(cart)
}
