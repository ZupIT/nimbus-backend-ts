import { Expression } from '@zup-it/nimbus-backend-core'
import { openNativeRoute } from '@zup-it/nimbus-backend-core/actions'

export const localNavigator = {
  goToOrderDetails: (orderId: Expression<string>) => openNativeRoute({ route: 'orders', data: { orderId } }),
}
