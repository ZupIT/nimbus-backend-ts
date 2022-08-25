import { NimbusJSX, FC, WithChildren, Expression, ForEach } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, ContainerProps, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { globalState } from '../global-state'
import { formatPrice } from '../operations'
import { Product } from './product'

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
}

const DefinitionItem: FC<DefinitionItemProps> = ({ title, definition }) => (
  <Row mainAxisAlignment="spaceBetween" marginVertical={6}>
    <Column marginEnd={24}>
      <Text size={14} weight="bold">{title}</Text>
    </Column>
    <Text size={14} weight="normal">{definition}</Text>
  </Row>
)

export const Order: Screen = ({ navigator }) => {
  const order = globalState.get('currentOrder')
  const address = order.get('address')

  return (
    <ScreenComponent title="Order">
      <Column backgroundColor="#EEEEEE" width="expand" height="expand">
        <ScrollView>
          <Column padding={16}>
            <Section title="Details">
              <DefinitionItem title="Id:" definition={order.get('id')} />
              <DefinitionItem title="Status:" definition={order.get('state')} />
            </Section>
            <Section title="Products">
              <ForEach items={order.get('products')} iteratorName="product">
                {(product) => (
                  <Touchable onPress={[globalState.get('currentProduct').set(product), navigator.present(Product)]}>
                    <DefinitionItem title={product.get('title')} definition={formatPrice(product.get('price'), 'BRL')} />
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
