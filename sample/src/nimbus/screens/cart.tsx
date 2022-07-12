import { Else, ForEach, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { isEmpty, not } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { BaseImageStyle, Column, Container, ContainerStyle, RemoteImage, Row, ScreenComponent, Text, TextStyle } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice, sumProducts } from '../operations'
import { Address } from './address'

interface PageStyle {
  wrapper: ContainerStyle,
  emptyCart: ContainerStyle,
  list: ContainerStyle,
  item: ContainerStyle,
  image: BaseImageStyle,
  title: TextStyle,
  summaryBox: ContainerStyle,
}

export const styles: PageStyle = {
  wrapper: {
    flex: 1,
    mainAxisAlignment: 'spaceBetween',
    backgroundColor: '#f2f2f2',
  },
  emptyCart: {
    flex: 1,
    paddingHorizontal: 15,
    mainAxisAlignment: 'center',
  },
  list: {
    paddingHorizontal: 15,
  },
  item: {
    mainAxisAlignment: 'center',
    padding: 10,
    marginVertical: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    backgroundColor: '#fff',
    cornerRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    scale: 'center',
  },
  title: {
    marginEnd: 15,
  },
  summaryBox: {
    padding: 10,
    mainAxisAlignment: 'center',
    backgroundColor: '#fff',
  },
}

export const Cart: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  return (
    <ScreenComponent title="Cart">
      <Column style={styles.wrapper}>
        <If condition={isEmpty(cart)}>
          <Then>
            <Container style={styles.emptyCart}>
              <Text>Your cart is empty. Go to the products page and add some products.</Text>
            </Container>
          </Then>
          <Else>
            <Container style={styles.list}>
              <ForEach items={cart}>
                {item => (
                  <Row style={styles.item}>
                    <RemoteImage url={item.get('image').toString()} style={styles.image} />
                    <Text style={styles.title}>{item.get('title')}</Text>
                    <Text>{formatPrice(item.get('price'), 'BRL')}</Text>
                  </Row>
                )}
              </ForEach>
            </Container>
          </Else>
        </If>
        <Row style={styles.summaryBox}>
          <Column>
            <Text>Total</Text>
            <Text style={{ color: '#008000' }}>{formatPrice(sumProducts(cart), 'BRL')}</Text>
          </Column>
          <Button enabled={not(isEmpty(cart))} onPress={navigator.push(Address)}>Buy</Button>
        </Row>
      </Column>
    </ScreenComponent>
  )
}
