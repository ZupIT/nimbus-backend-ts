import { contains, Else, If, insert, length, NimbusJSX, sum, Then } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, RemoteImage, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { updateCartIndicator } from '../actions'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice } from '../operations'

export const Product: Screen = () => {
  const product = globalState.get('currentProduct')
  const cart = globalState.get('cart')
  const addToCart = [
    updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
    cart.set(insert(cart, product)),
  ]

  return (
    <ScreenComponent title="Product details">
      <ScrollView>
        <Column flex={1} padding={12} mainAxisAlignment="center" crossAxisAlignment="start">
          <Text color="#212121" size={24} weight="semiBold">{product.get('title')}</Text>
          <Row marginVertical={18}>
            <RemoteImage url={product.get('image').toString()} scale="center" width={260} height={260} />
            <Row marginVertical={30}>
              <Text>{formatPrice(product.get('price'), 'BRL')}</Text>
            </Row>
            <If condition={contains(cart, product)}>
              <Then>
                <Row marginBottom={24}>
                  <Text color="#2E8B57" size={18} weight="bold">In cart ✓</Text>
                </Row>
              </Then>
              <Else>
                <Button text="Add to cart" onPress={addToCart} />
              </Else>
            </If>
          </Row>
          <Text color="#212121" size={18} weight="light">{product.get('description')}</Text>
        </Column>
      </ScrollView>
    </ScreenComponent>
  )
}
