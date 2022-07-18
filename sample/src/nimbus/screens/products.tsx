import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { contains, insert, length, subtract } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Product as ProductModel } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { globalState } from '../global-state'
import { Loading } from '../fragments/loading'
import { Column, Lifecycle, Row, ScreenComponent, ScrollView } from '@zup-it/nimbus-backend-layout'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { eq } from 'lodash'
import { Product } from './product'

interface ProductData {
  isLoading: boolean,
  data: ProductModel[],
}

export const Products: Screen = ({ navigator }) => {
  const products = createState<ProductData>('products', { isLoading: true, data: [] })
  const cart = globalState.get('cart')
  const onInit = listProducts({
    onSuccess: response => products.get('data').set(response.get('data')),
    onError: response => log({ message: response.get('message').toString(), level: 'Error' }),
    onFinish: products.get('isLoading').set(false),
  })

  return (
    <ScreenComponent title="Products" state={products}>
      <Lifecycle onInit={[onInit]}>
        <ScrollView>
          <Column backgroundColor="#eee" flex={1} crossAxisAlignment="start" mainAxisAlignment="start" padding={12}>
            <Loading isLoading={products.get('isLoading')}>
              <ForEach items={products.get('data')} iteratorName="product">
                {(product, index) => (
                  <Row>
                    <ProductItem
                      image={product.get('image')}
                      title={product.get('title')}
                      price={product.get('price')}
                      inCart={contains(cart, product)}
                      onPressBuy={globalState.get('cart').set(insert(globalState.get('cart'), product))}
                      onPressDetails={[globalState.get('currentProduct').set(product), navigator.push(Product)]}
                      isFirst={eq(index, 0)}
                      isLast={eq(index, subtract(length(products.get('data')), 1))}
                    />
                  </Row>
                )}
              </ForEach>
            </Loading>
          </Column>
        </ScrollView>
      </Lifecycle>
    </ScreenComponent>
  )
}
