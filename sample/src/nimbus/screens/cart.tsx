import { Else, ForEach, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { isEmpty, not } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, RemoteImage, Row, ScreenComponent, Text } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice, sumProducts } from '../operations'
import { Address } from './address'

export const Cart: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  return (
    <ScreenComponent title="Cart">
      <Column flex={1} mainAxisAlignment="spaceBetween" backgroundColor="#f2f2f2">
        <If condition={isEmpty(cart)}>
          <Then>
            <Row flex={1} paddingHorizontal={15} mainAxisAlignment="center">
              <Text>Your cart is empty. Go to the products page and add some products.</Text>
            </Row>
          </Then>
          <Else>
            <Row paddingHorizontal={15}>
              <ForEach items={cart}>
                {(item, index) => (
                  <Row
                    mainAxisAlignment="center"
                    padding={10}
                    marginVertical={10}
                    borderColor="#e3e3e3"
                    borderWidth={1}
                    backgroundColor="#fff"
                    cornerRadius={8}
                  >
                    <RemoteImage url={item.get('image')} width={50} height={50} scale="center" />
                    <Row marginEnd={15}>
                      <Text>{item.get('title')}</Text>
                    </Row>
                    <Text>{formatPrice(item.get('price'), 'BRL')}</Text>
                  </Row>
                )}
              </ForEach>
            </Row>
          </Else>
        </If>
        <Row padding={10} mainAxisAlignment="center" backgroundColor="#fff">
          <Column>
            <Text>Total</Text>
            <Text color="#008000">{formatPrice(sumProducts(cart), 'BRL')}</Text>
          </Column>
          <Button text="Buy" enabled={not(isEmpty(cart))} onPress={navigator.push(Address)} />
        </Row>
      </Column>
    </ScreenComponent>
  )
}
