import { NimbusJSX, createState, FC, Expression } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { createOrder } from '../network/order'
import { PaymentCard } from '../../models/order'
import { globalState } from '../global-state'
import { Column, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { TextInput, TextInputProps } from '../components/text-input'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { AddressModel } from '../../models/order'
import { Cart } from './cart'
import { changeBottomNavigatorRoute } from '../actions'

type PaymentInputProps = {
  label: string,
  placeholder: string,
  name: keyof PaymentCard,
  paymentState: MapStateNode<PaymentCard>,
  type?: TextInputProps['type'],
}

const PaymentInput: FC<PaymentInputProps> = ({ label, placeholder, name, paymentState: state, type }) => {
  const getField = (name: keyof PaymentCard) => state.get(name)
  const setField = (name: keyof PaymentCard, value: Expression<string>) => state.get(name).set(value)
  return (
    <Row marginTop={4}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={getField(name)}
        onChange={value => setField(name, value)}
        type={type}
      />
    </Row>
  )
}

interface PaymentScreenProps extends ScreenRequest {
  state: {
    address: AddressModel,
  }
}

export const Payment: Screen<PaymentScreenProps> = ({ navigator, getViewState }) => {
  const cart = globalState.get('cart')
  const orders = globalState.get('orders')
  const address = getViewState('address')
  const card = createState<PaymentCard>('card')
  const makeOrder = createOrder(
    {
      data: {
        address: address,
        payment: card,
      },
      onSuccess: response => [
        cart.get('products').set([]),
        cart.get('total').set(0),
        orders.set(response.get('data')),
        navigator.popTo(Cart),
        changeBottomNavigatorRoute({ route: 'Orders' })
      ],
      onError: response => log({
        message: response.get('message'),
        level: 'error'
      })
    },
  )

  return (
    <ScreenComponent title="Payment" state={card}>
      <Column backgroundColor="#EEEEEE">
        <Column padding={16} height="expand">
          <Row marginBottom={12}>
            <PaymentInput label="Card number" placeholder="0000 0000 0000 0000" name="number" type="number" paymentState={card} />
          </Row>
          <Row marginBottom={48}>
            <Column marginEnd={6} width="expand">
              <PaymentInput label="Expiration Date" placeholder="MM/YY" name="expirationDate" paymentState={card} />
            </Column>
            <Column marginStart={6} width={90}>
              <PaymentInput label="CVC" placeholder="000" name="cvc" type="number" paymentState={card} />
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
