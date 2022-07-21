import { Else, ForEach, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { eq, isEmpty, length, not, subtract } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, RemoteImage, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { Product as ProductModel } from '../../models/product'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice, sumProducts } from '../operations'
import { Address } from './address'
import { Product } from './product'

export const Cart: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  const goToDetails = (product: MapStateNode<ProductModel>) => [
    globalState.get('currentProduct').set(product), navigator.push(Product)
  ]

  return (
    <ScreenComponent title="Cart">
        <If condition={isEmpty(cart)}>
          <Then>
            <Column backgroundColor="#f2f2f2" mainAxisAlignment="center" padding={24}>
              <Text color="#aaa" weight="light">Your cart is empty. Go to the products page and add some products.</Text>
            </Column>
          </Then>
          <Else>
            <Column backgroundColor="#f2f2f2">
              <ScrollView>
                <Column padding={12}>
                  <ForEach items={cart}>
                    {(product, index) => (
                      <Row
                        padding={12}
                        marginBottom={12}
                        borderColor="#e3e3e3"
                        borderWidth={1}
                        backgroundColor="#fff"
                        cornerRadius={12}
                        crossAxisAlignment="center"
                      >
                        <Touchable onPress={goToDetails(product)}>
                          <RemoteImage url={product.get('image')} width={50} height={50} scale="fillWidth" />
                        </Touchable>
                        <Row marginHorizontal={16}>
                          <Column mainAxisAlignment="center">
                            <Touchable onPress={goToDetails(product)}>
                              <Text size={14} weight="light">{product.get('title')}</Text>
                            </Touchable>
                          </Column>
                        </Row>
                        <Text size={14} weight="normal">{formatPrice(product.get('price'), 'BRL')}</Text>
                      </Row>
                    )}
                  </ForEach>
                </Column>
              </ScrollView>
              <Row
                height={70}
                paddingHorizontal={12}
                crossAxisAlignment="center"
                backgroundColor="#fff"
                borderColor="#e3e3e3"
                borderWidth={1}
              >
                <Column mainAxisAlignment="center">
                  <Text size={14} weight="light">Total</Text>
                  <Text color="#008000">{formatPrice(sumProducts(cart), 'BRL')}</Text>
                </Column>
                <Button text="Buy" enabled={not(isEmpty(cart))} onPress={navigator.push(Address)} />
              </Row>
            </Column>
          </Else>
        </If>
    </ScreenComponent>
  )
}
