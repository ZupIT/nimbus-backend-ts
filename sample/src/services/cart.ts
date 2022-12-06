import { Cart } from '../models/cart'
import { getProductById } from './product'

let cart: Cart = { total: 0, products: [] }

export function getCart() {
  return cart
}

export function addToCart(productId: number): Cart {
  const productInCart = cart.products.find(p => p.id === productId)
  if (productInCart) {
    productInCart.quantity++
    cart.total += productInCart.price
  } else {
    const product = getProductById(productId)
    if (product) {
      const cartProduct = { ...product, quantity: 1 }
      cart.products.push(cartProduct)
      cart.total += product.price
    }
  }

  return cart
}

export function clearCart() {
  cart = { total: 0, products: [] }
  return cart
}
