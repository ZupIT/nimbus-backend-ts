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

export const Products: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  const products = createState<ProductModel[]>('products', [])
  const isLoading = createState('isLoading', true)
  const onInit = [
    listProducts({
      onSuccess: response => products.set(response.get('data')),
      onError: response => log({ message: response.get('message').toString(), level: 'error' }),
      onFinish: isLoading.set(false),
    }),
    conditionalAction({
      condition: isNull(cart),
      onTrue: getCart({
        onSuccess: (response) => cart.set(response.get('data')),
      }),
    })
  ]

  return (
    <ScreenComponent title="Products" state={[products, isLoading]}>
      <Lifecycle onInit={onInit}>
        <Column backgroundColor="#EEEEEE" width="expand" height="expand">
          <Loading isLoading={isLoading}>
            <LazyColumn padding={16}>
                <ForEach items={products} iteratorName="product">
                  {(product) => (
                    <ProductItem
                      image={product.get('image')}
                      title={product.get('title')}
                      price={product.get('price')}
                      onPressBuy={addToCart(product.get('id'))}
                      onPressDetails={navigator.present(Product, { state: { product } })}
                    />
                  )}
                </ForEach>
              </LazyColumn>
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
