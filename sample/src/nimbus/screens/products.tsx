import { NimbusJSX, createState } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { contains, insert, length, sum } from '@zup-it/nimbus-backend-core/operations'
import { Product } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { formatPrice } from '../operations'
import { globalState } from '../global-state'
import { Loading } from '../fragments/loading'
import { theme } from '../constants'
import { updateCartIndicator } from '../actions'
import { Product as ProductScreen } from './product'

interface ProductData {
  isLoading: boolean,
  data: Product[],
}

export const Products: Screen = ({ navigator }) => {
  // const products = createState<ProductData>('products', { isLoading: true, data: [] })
  // const cart = globalState.get('cart')
  // const onInit = listProducts({
  //   onSuccess: response => products.get('data').set(response.get('data')),
  //   onError: response => alert(response.get('message')),
  //   onFinish: products.get('isLoading').set(false),
  // })

  return (
    <></>
    // <ScreenComponent safeArea={true} navigationBar={{ title: 'Products' }}>
    //   <Container state={products} onInit={onInit} style={{ backgroundColor: theme.viewBackground }}>
    //     <Loading isLoading={products.get('isLoading')}>
    //       <GridView dataSource={products.get('data')} spanCount={2} key="id" itemAspectRatio={0.6}>
    //         {item => (
    //           <Template>
    //             <ProductItem
    //               productId={item.get('id')}
    //               image={item.get('image')}
    //               price={formatPrice(item.get('price'), 'BRL')}
    //               title={item.get('title')}
    //               inCart={contains(cart, item)}
    //               onPressBuy={[
    //                 updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
    //                 cart.set(insert(cart, item)),
    //               ]}
    //               onPressDetails={navigator.pushView(ProductScreen, { navigationState: { product: item } })}
    //             />
    //           </Template>
    //         )}
    //       </GridView>
    //     </Loading>
    //   </Container>
    // </ScreenComponent>
  )
}
