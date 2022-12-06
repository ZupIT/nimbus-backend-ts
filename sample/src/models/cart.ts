import { Product } from './product'

export interface CartProduct extends Product {
  quantity: number,
}

export interface Cart {
  total: number,
  products: CartProduct[],
}
