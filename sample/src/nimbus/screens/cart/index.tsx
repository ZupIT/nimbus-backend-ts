import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { isEmpty, not } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { globalState } from '../../global-state'
import { formatPrice, sumProducts } from '../../operations'
import { Address } from '../address'

export const Cart: Screen = ({ navigator }) => {
  // const cart = globalState.get('cart')
  return (
    <></>
    // <ScreenComponent safeArea={true} navigationBar={{ title: 'Cart', showBackButton: true }}>
    //   <Container style={style.page}>
    //     <If condition={isEmpty(cart)} style={style.cartContent}>
    //       <Then>
    //         <Container style={style.emptyCart}>
    //           <Text alignment="CENTER">Your cart is empty. Go to the products page and add some products.</Text>
    //         </Container>
    //       </Then>
    //       <Else>
    //         <Container style={style.list}>
    //           <ListView dataSource={cart} key="id">
    //             {(item) => (
    //               <Template>
    //                 <Container style={style.item}>
    //                   <Image type="remote" url={item.get('image')} style={style.image} mode="FIT_CENTER" />
    //                   <Text style={style.title}>{item.get('title')}</Text>
    //                   <Text>{formatPrice(item.get('price'), 'BRL')}</Text>
    //                 </Container>
    //               </Template>
    //             )}
    //           </ListView>
    //         </Container>
    //       </Else>
    //     </If>

    //     <Container style={style.summaryBox}>
    //       <Container style={style.total}>
    //         <Text>Total</Text>
    //         <Text textColor={colors.green}>{formatPrice(sumProducts(cart), 'BRL')}</Text>
    //       </Container>
    //       <Button enabled={not(isEmpty(cart))} onPress={navigator.pushView(Address)}>Buy</Button>
    //     </Container>
    //   </Container>
    // </ScreenComponent>
  )
}
