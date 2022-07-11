import { Expression } from '@zup-it/nimbus-backend-core'
import { push } from '@zup-it/nimbus-backend-core/actions'

export const localNavigator = {
  goToOrderDetails: (orderId: Expression<string>) => push(`/order/${orderId}`),
}
