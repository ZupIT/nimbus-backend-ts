import { NimbusJSX, createState, FC, WithChildren, Expression, ForEach } from '@zup-it/nimbus-backend-core'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, ContainerStyle, Lifecycle, Row, ScreenComponent, Text, TextStyle } from '@zup-it/nimbus-backend-layout'
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

interface PageStyles {
  page: ContainerStyle,
  sectionTitle: ContainerStyle,
  card: ContainerStyle,
  definitionItem: ContainerStyle,
  productTitle: TextStyle,
}

export const styles: PageStyles = {
  page: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
  },
  sectionTitle: {
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    cornerRadius: 8,
  },
  definitionItem: {
    mainAxisAlignment: 'spaceBetween',
    paddingVertical: 5,
  },
  productTitle: {
    width: 70,
  },
}

interface SectionProps extends WithChildren {
  title?: string
}

const Section: FC<SectionProps> = ({ title, children }) => {
  const card = <Column style={styles.card}>{children}</Column>
  return title ? (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      {card}
    </>
  ) : card
}

interface DefinitionItemProps extends WithStyle {
  title: Expression<string>,
  definition: Expression<string>,
}

const DefinitionItem: FC<DefinitionItemProps> = ({ title, definition, style: titleStyle }) => (
  <Row style={styles.definitionItem}>
    <Text style={titleStyle}>{title}</Text>
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
        <Column state={orderState} style={styles.page}>
          <Loading isLoading={orderState.get('isLoading')}>
            <Section>
              <DefinitionItem title="Id:" definition={order.get('id')} />
              <DefinitionItem title="Status:" definition={order.get('state')} />
            </Section>
            <Section title="Products">
              <ForEach items={order.get('products')}>
                {(item) => (
                  <DefinitionItem
                    title={item.get('title')}
                    definition={formatPrice(item.get('price'), 'BRL')}
                    style={styles.productTitle}
                  />
                )}
              </ForEach>
            </Section>
            <Section title="Shipment">
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
