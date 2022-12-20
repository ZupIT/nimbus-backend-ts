import { NimbusJSX, createState, ForEach, Then, Else, If } from '@zup-it/nimbus-backend-core'
import { isEmpty, isNull, length, subtract } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Loading } from '../fragments/loading'
import { Column, LazyColumn, Lifecycle, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { conditionalAction, log } from '@zup-it/nimbus-backend-core/actions'
import { eq } from 'lodash'
import { Order as OrderModel } from '../../models/order'
import { listOrders } from '../network/order'
import { formatPrice } from '../operations'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Order } from './order'
import { globalState } from '../global-state'

export const Orders: Screen = ({ navigator }) => {
  /* Here, it would be ideal not to use the global state, but considering we're using a bottom navigator, this is the
  only way of updating the list of orders whenever it might have changed. We intend to find a solution for this problem
  before a stable release. */
  const orders = globalState.get('orders')
  const isLoading = createState('isLoading', true)

  const onInit = conditionalAction({
    condition: isNull(orders),
    onTrue: listOrders({
      onSuccess: response => orders.set(response.get('data')),
      onError: response => log({ message: response.get('message').toString(), level: 'error' }),
      onFinish: isLoading.set(false),
    }),
    onFalse: isLoading.set(false),
  })

  const goToDetails = (order: MapStateNode<OrderModel>) => [
    navigator.present(Order, {
      params: {
        order,
      }
    })
  ]

  const emptyOrdersView = (
    <Column width="expand" height="expand" padding={20} mainAxisAlignment="center" crossAxisAlignment="center">
      <Text alignment="center">You don't have any order yet.</Text>
    </Column>
  )

  const ordersView = (
    <ScrollView>
      <Column padding={12}>
        <ForEach items={orders} iteratorName="order" key="id">
          {(order, index) => (
            <Touchable onPress={goToDetails(order)}>
              <Row
                width="expand"
                padding={12}
                marginVertical={6}
                borderColor="#e3e3e3"
                borderWidth={1}
                backgroundColor="#fff"
                cornerRadius={12}
                mainAxisAlignment="spaceBetween"
                crossAxisAlignment="center"
                {...(eq(index, 0) ? { marginTop: 0 } : {})}
                {...(eq(index, subtract(length(orders), 1)) ? { marginBottom: 0 } : {})}
              >
                <Text size={14} weight="semiBold">#{order.get('id')}</Text>
                <Text size={14} weight="normal">{order.get('state')}</Text>
                <Text size={14} weight="normal">{formatPrice(order.get('total'), 'BRL')}</Text>
              </Row>
            </Touchable>
          )}
        </ForEach>
      </Column>
    </ScrollView>
  )

  return (
    <ScreenComponent title="Orders" state={isLoading}>
      <Lifecycle onInit={[onInit]}>
        <Column backgroundColor="#eee" width="expand">
          <Loading isLoading={isLoading}>
            <If condition={isEmpty(orders)}>
              <Then>{emptyOrdersView}</Then>
              <Else>{ordersView}</Else>
            </If>
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
