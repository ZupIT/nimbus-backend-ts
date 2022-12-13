import { NimbusJSX, FC, WithChildren, Expression, ForEach, multiply } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, ContainerProps, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { formatPrice } from '../operations'
import { Product } from './product'
import { Order as OrderModel } from '../../models/order'

interface SectionProps extends WithChildren {
  title: string
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <Column marginBottom={24}>
      <Column width="expand" crossAxisAlignment="center" marginVertical={6}>
        <Text size={20}>{title}</Text>
      </Column>
      <Column
        backgroundColor="#FFFFFF"
        padding={12}
        borderColor="#e3e3e3"
        borderWidth={1}
        cornerRadius={8}
        marginTop={6}
        width="expand"
      >
        {children}
      </Column>
    </Column>
  )
}

interface DefinitionItemProps extends ContainerProps {
  title: Expression<string>,
  definition: Expression<string>,
  definitionWidth?: number,
}

const DefinitionItem: FC<DefinitionItemProps> = ({ title, definition }) => (
  <Row mainAxisAlignment="spaceBetween" marginVertical={6} width="expand">
    <Column marginEnd={12} width="expand">
      <Text size={14} weight="bold">{title}</Text>
    </Column>
    <Column mainAxisAlignment="end">
      <Text size={14} weight="normal">{definition}</Text>
    </Column>
  </Row>
)

interface OrderScreenProps extends ScreenRequest {
  params: {
    order: OrderModel,
  }
}

export const Order: Screen<OrderScreenProps> = ({ navigator, getViewState }) => {
  const order = getViewState('order')
  const address = order.get('address')
  return (
    <ScreenComponent title="Order">
      <Column width="expand" height="expand">
        <ScrollView>
          <Column padding={16}>
            <Section title="Details">
              <DefinitionItem title="Id:" definition={order.get('id')} />
              <DefinitionItem title="Status:" definition={order.get('state')} />
            </Section>
            <Section title="Products">
              <ForEach items={order.get('products')} iteratorName="product" key="id">
                {(product) => (
                  <Touchable onPress={[navigator.present(Product, { params: { product } })]}>
                    <DefinitionItem
                      title={`(${product.get('quantity')}) ${product.get('title')}`}
                      definition={formatPrice(multiply(product.get('quantity'), product.get('price')), 'BRL')}
                    />
                  </Touchable>
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
          </Column>
        </ScrollView>
      </Column>
    </ScreenComponent>
  )
}
