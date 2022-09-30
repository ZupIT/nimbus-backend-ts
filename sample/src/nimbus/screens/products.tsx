import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { eq, insert } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Product as ProductModel } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { globalState } from '../global-state'
import { Loading } from '../fragments/loading'
import { Column, Lifecycle, ScreenComponent, ScrollView } from '@zup-it/nimbus-backend-layout'
import { log } from '@zup-it/nimbus-backend-core/actions'
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
        <Column backgroundColor="#EEEEEE" width="expand" height="expand">
          <Loading isLoading={products.get('isLoading')}>
            <ScrollView>
              <Column padding={16}>
                <ForEach items={products.get('data')} iteratorName="product">
                  {(product) => (
                    <ProductItem
                      image={product.get('image')}
                      title={product.get('title')}
                      price={product.get('price')}
                      inCart={eq(product.get('inCart'), true)}
                      onPressBuy={[
                        globalState.get('cart').set(insert(globalState.get('cart'), product)),
                        product.get('inCart').set(true),
                      ]}
                      onPressDetails={[globalState.get('currentProduct').set(product), navigator.present(Product)]}
                    />
                  )}
                </ForEach>
              </Column>
            </ScrollView>
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
