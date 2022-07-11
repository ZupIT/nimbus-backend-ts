import { NimbusJSX, createState } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { createOrder } from '../network/order'
import { Address, PaymentCard } from '../../models/order'
import { globalState } from '../global-state'
import { updateCartIndicator } from '../actions'
import { localNavigator } from '../local-navigator'
import { Container, ContainerStyle, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { Margin } from '@zup-it/nimbus-backend-core/model/style'
import { TextInput } from '../components/text-input'

interface PageStyle {
  wrapper: ContainerStyle,
  formItem: Margin,
  buyRow: ContainerStyle,
  content: ContainerStyle,
}

const styles: PageStyle = {
  wrapper: {
    flex: 1,
    padding: 12,
    mainAxisAlignment: 'center',
    crossAxisAlignment: 'start',
  },
  formItem: {
    margin: 8,
  },
  buyRow: {
    mainAxisAlignment: 'end',
    crossAxisAlignment: 'end',
  },
  content: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 12,
    mainAxisAlignment: 'spaceBetween'
  },
}

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
      style={{ ...(shouldExpand ? { flex: 1 } : {}), ...styles.formItem }}
    />
  )

  return (
    <ScreenComponent title="Payment" state={card}>
      <Container style={styles.content}>
        <Container>
          {createInput('Card number', 'number', false)}
          <Row>
            {createInput('MM/YY', 'expirationDate')}
            {createInput('CVC', 'cvc')}
          </Row>
        </Container>
        <Row style={{ ...styles.buyRow, ...styles.formItem  }}>
          <Button onPress={makeOrder}>Buy</Button>
        </Row>
      </Container>
    </ScreenComponent>
  )
}
