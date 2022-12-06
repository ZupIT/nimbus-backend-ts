import { NimbusJSX, createState, ForEach, isNull } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Product as ProductModel } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { Loading } from '../fragments/loading'
import { Column, LazyColumn, Lifecycle, ScreenComponent, ScrollView } from '@zup-it/nimbus-backend-layout'
import { conditionalAction, log } from '@zup-it/nimbus-backend-core/actions'
import { Product } from './product'
import { addToCart, getCart } from '../network/cart'
import { globalState } from '../global-state'

interface ProductData {
  isLoading: boolean,
  data: ProductModel[],
}

export const Products: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  const products = createState<ProductData>('products', { isLoading: true, data: [] })
  const onInit = [
    listProducts({
      onSuccess: response => products.get('data').set(response.get('data')),
      onError: response => log({ message: response.get('message').toString(), level: 'Error' }),
      onFinish: products.get('isLoading').set(false),
    }),
    conditionalAction({
      condition: isNull(cart),
      onTrue: getCart({
        onSuccess: (response) => cart.set(response.get('data')),
      }),
    })
  ]

  return (
    <ScreenComponent title="Products" state={products}>
      <Lifecycle onInit={onInit}>
        <Column backgroundColor="#EEEEEE" width="expand" height="expand">
          <Loading isLoading={products.get('isLoading')}>
            <ScrollView>
              <LazyColumn padding={16}>
                <ForEach items={products.get('data')} iteratorName="product">
                  {(product) => (
                    <ProductItem
                      image={product.get('image')}
                      title={product.get('title')}
                      price={product.get('price')}
                      onPressBuy={addToCart(product.get('id'))}
                      onPressDetails={navigator.present(Product, { params: { product } })}
                    />
                  )}
                </ForEach>
              </LazyColumn>
            </ScrollView>
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
