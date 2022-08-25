import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { length, subtract } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Loading } from '../fragments/loading'
import { Column, Lifecycle, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { eq } from 'lodash'
import { Order as OrderModel } from '../../models/order'
import { listOrders } from '../network/order'
import { formatPrice } from '../operations'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Order } from './order'
import { globalState } from '../global-state'

interface OrderData {
  isLoading: boolean,
  data: OrderModel[],
}

export const Orders: Screen = ({ navigator }) => {
  const orders = createState<OrderData>('orders', { isLoading: true, data: [] })
  const onInit = listOrders({
    onSuccess: response => orders.get('data').set(response.get('data')),
    onError: response => log({ message: response.get('message').toString(), level: 'Error' }),
    onFinish: orders.get('isLoading').set(false),
  })
  const goToDetails = (order: MapStateNode<OrderModel>) => [
    globalState.get('currentOrder').set(order),
    navigator.push(Order)
  ]

  return (
    <ScreenComponent title="Orders" state={orders}>
      <Lifecycle onInit={[onInit]}>
        <Column backgroundColor="#eee">
          <Loading isLoading={orders.get('isLoading')}>
            <ScrollView>
              <Column padding={12}>
                <ForEach items={orders.get('data')} iteratorName="order">
                  {(order, index) => (
                    <Touchable onPress={goToDetails(order)}>
                      <Row
                        padding={12}
                        marginVertical={6}
                        borderColor="#e3e3e3"
                        borderWidth={1}
                        backgroundColor="#fff"
                        cornerRadius={12}
                        mainAxisAlignment="spaceBetween"
                        crossAxisAlignment="center"
                        {...(eq(index, 0) ? { marginTop: 0 } : {})}
                        {...(eq(index, subtract(length(orders.get('data')), 1)) ? { marginBottom: 0 } : {})}
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
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
