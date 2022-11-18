import { Else, ForEach, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { isEmpty, not } from '@zup-it/nimbus-backend-core/operations'
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
    navigator.present(Product, {
      params: {
        currentProduct: product,
      }
    })
  ]

  return (
    <ScreenComponent title="Cart">
      <Column width="expand" height="expand" backgroundColor="#EEEEEE">
        <If condition={isEmpty(cart)}>
          <Then>
            <Column width="expand" height="expand" padding={20} mainAxisAlignment="center" crossAxisAlignment="center">
              <Text alignment="center">Your cart is empty. Go to the products page and add some products.</Text>
            </Column>
          </Then>
          <Else>
            <Column height="expand">
              <ScrollView>
                <Column padding={16}>
                  <ForEach items={cart} key="id">
                    {(product) => (
                      <Touchable onPress={goToDetails(product)}>
                        <Row
                          padding={12}
                          marginBottom={14}
                          borderColor="#e3e3e3"
                          borderWidth={1}
                          backgroundColor="#FFFFFF"
                          cornerRadius={12}
                          crossAxisAlignment="center"
                          width="expand"
                        >
                          <RemoteImage url={product.get('image')} width={50} scale="fillWidth" />
                          <Row marginStart={16} width="expand" mainAxisAlignment="spaceBetween">
                            { /* todo: by removing the following row with expand, the Text in Android acts differently
                            than the text on iOS. We should check this when we can. */}
                            <Row width="expand" marginEnd={10}>
                              <Text size={14} weight="light">{product.get('title')}</Text>
                            </Row>
                            <Text size={14} weight="normal">{formatPrice(product.get('price'), 'BRL')}</Text>
                          </Row>
                        </Row>
                      </Touchable>
                    )}
                  </ForEach>
                </Column>
              </ScrollView>
            </Column>
            <Row
              height={70}
              paddingHorizontal={16}
              crossAxisAlignment="center"
              backgroundColor="#FFFFFF"
              borderColor="#e3e3e3"
              borderWidth={1}
              width="expand"
              mainAxisAlignment="spaceBetween"
            >
              <Column>
                <Text size={14} weight="light">Total</Text>
                <Text color="#008000">{formatPrice(sumProducts(cart), 'BRL')}</Text>
              </Column>
              <Button text="Buy" enabled={not(isEmpty(cart))} onPress={navigator.push(Address)} />
            </Row>
          </Else>
        </If>
      </Column>
    </ScreenComponent>
  )
}
