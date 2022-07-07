import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { contains, insert, length, sum } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Product } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { formatPrice } from '../operations'
import { globalState } from '../global-state'
import { Loading } from '../fragments/loading'
import { theme } from '../constants'
import { updateCartIndicator } from '../actions'
import { Product as ProductScreen } from './product'
import { Container, ScreenComponent } from '@zup-it/nimbus-backend-layout'

interface ProductData {
  isLoading: boolean,
  data: Product[],
}

export const Products: Screen = ({ navigator }) => {
  const products = createState<ProductData>('products', { isLoading: true, data: [] })
  const cart = globalState.get('cart')
  const onInit = listProducts({
    onSuccess: response => products.get('data').set(response.get('data')),
    // onError: response => alert(response.get('message')),
    onFinish: products.get('isLoading').set(false),
  })

  return (
    <ScreenComponent title="Products">
      <Container state={products} style={{ backgroundColor: theme.viewBackground }}>
        <Loading isLoading={products.get('isLoading')}>
          <ForEach items={products.get('data')} key="product">
            {product => (
              <ProductItem
                productId={product.get('id')}
                image={product.get('image')}
                price={formatPrice(product.get('price'), 'BRL')}
                title={product.get('title')}
                inCart={contains(cart, product)}
                onPressBuy={[
                  updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
                  cart.set(insert(cart, product)),
                ]}
                onPressDetails={navigator.push(ProductScreen)}
              />
            )}
          </ForEach>
        </Loading>
      </Container>
    </ScreenComponent>
  )
}
