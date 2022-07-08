import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { contains } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Product } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { globalState } from '../global-state'
import { Loading } from '../fragments/loading'
import { Container, ContainerStyle, Lifecycle, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
import { log } from '@zup-it/nimbus-backend-core/actions'

interface ProductData {
  isLoading: boolean,
  data: Product[],
}

interface ProductsStyles {
  wrapper: ContainerStyle,
}

const styles: ProductsStyles = {
  wrapper: {
    backgroundColor: '#eee',
    flex: 1,
    crossAxisAlignment: 'start',
    mainAxisAlignment: 'start',
  },
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
    <ScreenComponent title="Products">
      <Lifecycle onInit={onInit}>
        <Container state={products} style={styles.wrapper}>
          <Loading isLoading={products.get('isLoading')}>
            <ForEach items={products.get('data')} key="product">
              {product => (
                <Row>
                  <ProductItem
                    image={product.get('image')}
                    title={product.get('title')}
                    price={product.get('price')}
                    inCart={contains(cart, product)}
                    onPressBuy={log({ message: '', level: 'Info' })}
                  />
                </Row>
              )}
            </ForEach>
          </Loading>
        </Container>
      </Lifecycle>
    </ScreenComponent>
  )
}
