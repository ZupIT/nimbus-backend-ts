import { NimbusJSX, createState, FC, WithChildren, Expression, ForEach } from '@zup-it/nimbus-backend-core'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { Margin, Padding } from '@zup-it/nimbus-backend-core/model/style'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, ContainerProps, Lifecycle, Row, ScreenComponent, Text } from '@zup-it/nimbus-backend-layout'
import { Order as OrderModel } from '../../models/order'
import { Loading } from '../fragments/loading'
import { getOrderById } from '../network/order'
import { formatPrice } from '../operations'

interface Props extends ScreenRequest {
  routeParams: {
    id: string,
  }
}

interface OrderState {
  isLoading: boolean,
  data?: OrderModel,
}

interface SectionProps extends WithChildren, Margin {
  title?: string
}

const Section: FC<SectionProps> = ({ title, children }) => {
  const card = (
    <Column
      backgroundColor="#fff"
      padding={10}
      marginVertical={10}
      marginHorizontal={15}
      borderColor="#e3e3e3"
      borderWidth={1}
      cornerRadius={8}
    >
      {children}
    </Column>
  )
  return title ? (<><Text marginVertical={12}>{title}</Text>{card}</>) : card
}

interface DefinitionItemProps extends ContainerProps {
  title: Expression<string>,
  definition: Expression<string>,
}

const DefinitionItem: FC<DefinitionItemProps> = ({ title, definition }) => (
  <Row>
    <Text>{title}</Text>
    <Text>{definition}</Text>
  </Row>
)

export const Order: Screen<Props> = ({ request: { params } }) => {
  const orderState = createState<OrderState>('order', { isLoading: true })
  const order = orderState.get('data')
  const address = order.get('address')
  const loadOrder = getOrderById({
    id: params.id,
    onSuccess: response => order.set(response.get('data')),
    onError: response => log({ message: `${response.get('status')}: ${response.get('message')}`, level: 'Error' }),
    onFinish: orderState.get('isLoading').set(false),
  })

  return (
    <ScreenComponent title="Order">
      <Lifecycle onInit={loadOrder}>
        <Column state={orderState} backgroundColor="#f2f2f2" paddingVertical={20}>
          <Loading isLoading={orderState.get('isLoading')}>
            <Section marginVertical={12}>
              <DefinitionItem title="Id:" definition={order.get('id')} />
              <DefinitionItem title="Status:" definition={order.get('state')} />
            </Section>
            <Section title="Products" marginVertical={12}>
              <ForEach items={order.get('products')}>
                {(item, index) => (
                  <DefinitionItem
                    title={item.get('title')}
                    definition={formatPrice(item.get('price'), 'BRL')}
                    mainAxisAlignment="spaceBetween"
                    paddingVertical={5}
                  />
                )}
              </ForEach>
            </Section>
            <Section title="Shipment" marginVertical={12}>
              <DefinitionItem title="Zip code:" definition={address.get('zip')} />
              <DefinitionItem title="City:" definition={address.get('city')} />
              <DefinitionItem title="State:" definition={address.get('state')} />
              <DefinitionItem title="Street:" definition={address.get('street')} />
              <DefinitionItem title="Number:" definition={address.get('number')} />
            </Section>
          </Loading>
        </Column>
      </Lifecycle>
    </ScreenComponent>
  )
}
