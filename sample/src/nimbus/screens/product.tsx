import { eq, Else, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, RemoteImage, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { Product as ProductModel } from '../../models/product'
import { Button } from '../components/button'
import { addToCart } from '../network/cart'
import { formatPrice } from '../operations'

interface ProductScreenProps extends ScreenRequest {
  state: {
    product: ProductModel,
  }
}

export const Product: Screen<ProductScreenProps> = ({ getViewState }) => {
  const product = getViewState('product')

  return (
    <ScreenComponent title="Product details">
      <Column backgroundColor="#FFFFFF" height="expand">
        <ScrollView>
          <Column padding={24} crossAxisAlignment="center">
            <Text size={24} weight="normal">{product.get('title')}</Text>
            <Row marginVertical={28}>
              <RemoteImage url={product.get('image').toString()} scale="fillWidth" width={160} height={160} />
            </Row>
            <Text size={20} weight="bold">{formatPrice(product.get('price'), 'BRL')}</Text>
            <Row marginVertical={36} mainAxisAlignment="center">
              <Button text="Add to cart" onPress={addToCart(product.get('id'))} />
            </Row>
            <Text size={16} weight="light" color="#515151">{product.get('description')}</Text>
          </Column>
        </ScrollView>
      </Column>
    </ScreenComponent>
  )
}
