import { NimbusJSX, createState, FC, Expression } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { createOrder } from '../network/order'
import { PaymentCard } from '../../models/order'
import { globalState } from '../global-state'
import { updateCartIndicator } from '../actions'
import { Column, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { log, push } from '@zup-it/nimbus-backend-core/actions'
import { TextInput } from '../components/text-input'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Order } from './order'

type PaymentInputProps = {
  label: string,
  placeholder: string,
  name: keyof PaymentCard,
  paymentState: MapStateNode<PaymentCard>,
}

const PaymentInput: FC<PaymentInputProps> = ({ label, placeholder, name, paymentState: state }) => {
  const getField = (name: keyof PaymentCard) => state.get(name)
  const setField = (name: keyof PaymentCard, value: Expression<string>) => state.get(name).set(value)
  return (
    <Row marginTop={4}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={getField(name)}
        onChange={value => setField(name, value)}
      />
    </Row>
  )
}

export const Payment: Screen = ({ navigator }) => {
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
        globalState.get('currentOrder').set(response.get('data')),
        navigator.popTo(Order)
      ],
      onError: response => log({ message: response.get('data').get('error').toString(), level: 'Error' })
    },
  )

  return (
    <ScreenComponent title="Payment" state={card}>
      <Column backgroundColor="#EEEEEE">
        <Column padding={16} height="expand">
          <Row marginBottom={12}>
            <PaymentInput label="Card number" placeholder="0000 0000 0000 0000" name="number" paymentState={card} />
          </Row>
          <Row marginBottom={48}>
            <Column marginEnd={6}>
              <PaymentInput label="Expiration Date" placeholder="MM/YY" name="expirationDate" paymentState={card} />
            </Column>
            <Column marginStart={6}>
              <PaymentInput label="CVC" placeholder="000" name="cvc" paymentState={card} />
            </Column>
          </Row>
        </Column>
        <Row mainAxisAlignment="end" width="expand" padding={16}>
          <Button text="Complete order" onPress={makeOrder} />
        </Row>
      </Column>
    </ScreenComponent>
  )
}
