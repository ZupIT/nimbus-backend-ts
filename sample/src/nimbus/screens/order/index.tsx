import { NimbusJSX, createState } from '@zup-it/nimbus-backend-core'
import { alert } from '@zup-it/nimbus-backend-core/actions'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Order as OrderModel } from '../../../models/order'
import { Loading } from '../../fragments/loading'
import { getOrderById } from '../../network/order'
import { formatPrice } from '../../operations'
import { DefinitionItem, Section } from './fragments'
// import { style } from './style'

// interface Props extends ScreenRequest {
//   routeParams: {
//     id: string,
//   }
// }

// interface OrderState {
//   isLoading: boolean,
//   data?: OrderModel,
// }

export const Order: Screen = () => {
  // const orderState = createState<OrderState>('order', { isLoading: true })
  // const order = orderState.get('data')
  // const address = order.get('address')
  // const loadOrder = getOrderById({
  //   id: params.id,
  //   onSuccess: response => order.set(response.get('data')),
  //   onError: response => alert(`${response.get('status')}: ${response.get('message')}`),
  //   onFinish: orderState.get('isLoading').set(false),
  // })

  return (
    <></>
    // <ScreenComponent navigationBar={{ title: 'Order' }}>
    //   <Container state={orderState} onInit={loadOrder} style={style.page}>
    //     <Loading isLoading={orderState.get('isLoading')}>
    //       <Section>
    //         <DefinitionItem title="Id:" definition={order.get('id')} />
    //         <DefinitionItem title="Status:" definition={order.get('state')} />
    //       </Section>

    //       <Section title="Products">
    //         <ListView dataSource={order.get('products')} key="id">
    //           {item => (
    //             <Template>
    //               <DefinitionItem
    //                 title={item.get('title')}
    //                 definition={formatPrice(item.get('price'), 'BRL')}
    //                 style={style.productTitle}
    //               />
    //             </Template>
    //           )}
    //         </ListView>
    //       </Section>

    //       <Section title="Shipment">
    //         <DefinitionItem title="Zip code:" definition={address.get('zip')} />
    //         <DefinitionItem title="City:" definition={address.get('city')} />
    //         <DefinitionItem title="State:" definition={address.get('state')} />
    //         <DefinitionItem title="Street:" definition={address.get('street')} />
    //         <DefinitionItem title="Number:" definition={address.get('number')} />
    //       </Section>
    //     </Loading>
    //   </Container>
    // </ScreenComponent>
  )
}
