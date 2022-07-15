import { NimbusJSX, createState } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { createOrder } from '../network/order'
import { AddressModel, PaymentCard } from '../../models/order'
import { globalState } from '../global-state'
import { updateCartIndicator } from '../actions'
import { localNavigator } from '../local-navigator'
import { Column, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { TextInput } from '../components/text-input'

export const Payment: Screen = () => {
  const cart = globalState.get('cart')
  const card = createState<PaymentCard>('card')
  const makeOrder = createOrder(
    {
      data: {
        products: cart,
        address: globalState.get('address'),
        payment: card,
      },
      onSuccess: (response) => [
        cart.set([]),
        updateCartIndicator({ numberOfElementsInCart: 0 }),
        localNavigator.goToOrderDetails(response.get('data').get('id')),
      ],
      onError: response => log({ message: response.get('data').get('error').toString(), level: 'Error' })
    },
  )

  const createInput = (placeholder: string, name: keyof PaymentCard, shouldExpand: boolean = true) => (
    <TextInput
      value={card.get(name)}
      placeholder={placeholder}
      onChange={value => card.get(name).set(value)}
      margin={8}
      { ...(shouldExpand ? { flex: 1 } : {}) }
    />
  )

  return (
    <ScreenComponent title="Payment" state={card}>
      <Column flex={1} marginTop={12} marginHorizontal={12} mainAxisAlignment="spaceBetween">
        <Row>
          {createInput('Card number', 'number', false)}
          <Row>
            {createInput('MM/YY', 'expirationDate')}
            {createInput('CVC', 'cvc')}
          </Row>
        </Row>
        <Row margin={8} mainAxisAlignment="end" crossAxisAlignment="end">
          <Button text="Buy" onPress={makeOrder} />
        </Row>
      </Column>
    </ScreenComponent>
  )
}
