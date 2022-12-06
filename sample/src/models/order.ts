import { CartProduct } from './cart'

export interface AddressModel {
  zip: string,
  street: string,
  number: string,
  city: string,
  state: string,
  complement: string,
  neighborhood: string,
}

export type OrderStatus = 'AWAITING_PAYMENT' | 'PAYMENT_ACCEPTED' | 'PREPARING' | 'SENT' | 'COMPLETED' | 'CANCELED'

export interface Order {
  id: string,
  state: OrderStatus,
  products: CartProduct[],
  total: number,
  address: AddressModel,
}

export interface PaymentCard {
  number: string,
  expirationDate: string,
  cvc: string,
}
