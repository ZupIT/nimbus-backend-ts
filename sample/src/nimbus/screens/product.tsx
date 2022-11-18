import { eq, Else, If, insert, NimbusJSX, Then, createStateNode } from '@zup-it/nimbus-backend-core'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, RemoteImage, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { Product as ProductModel } from '../../models/product'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice } from '../operations'

interface ProductScreenProps extends ScreenRequest {
  params: {
    currentProduct: ProductModel | MapStateNode<ProductModel>,
  }
}

export const Product: Screen<ProductScreenProps> = () => {
  const product = createStateNode<ProductModel>('currentProduct')

  return (
    <ScreenComponent title="Product details">
      <ScrollView>
        <Column padding={24} crossAxisAlignment="center">
          <Text size={24} weight="normal">{product.get('title')}</Text>
          <Row marginVertical={28}>
            <RemoteImage url={product.get('image').toString()} scale="fillWidth" width={160} />
          </Row>
          <Text size={20} weight="bold">{formatPrice(product.get('price'), 'BRL')}</Text>
          <Row marginVertical={36} mainAxisAlignment="center">
            <If condition={eq(product.get('inCart'), true)}>
              <Then>
                <Text color="#2E8B57" size={18} weight="bold">In cart ✓</Text>
              </Then>
              <Else>
                <Button text="Add to cart" onPress={[
                  globalState.get('cart').set(insert(globalState.get('cart'), product)),
                  product.get('inCart').set(true),
                ]} />
              </Else>
            </If>
          </Row>
          <Text size={16} weight="light" color="#515151">{product.get('description')}</Text>
        </Column>
      </ScrollView>
    </ScreenComponent>
  )
}
