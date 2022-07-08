import { contains, Else, If, insert, length, NimbusJSX, sum, Then } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import {
  BaseImageStyle,
  Container,
  ContainerStyle,
  RemoteImage,
  ScreenComponent,
  ScrollView,
  Text,
  TextStyle
} from '@zup-it/nimbus-backend-layout'
import { updateCartIndicator } from '../actions'
import { Button } from '../components/button'
import { globalState } from '../global-state'
import { formatPrice } from '../operations'

interface PageStyle {
  wrapper: ContainerStyle,
  title: TextStyle,
  content: ContainerStyle,
  image: BaseImageStyle,
  price: TextStyle,
  inCart: TextStyle,
  description: TextStyle,
}

const styles: PageStyle = {
  wrapper: {
    flex: 1,
    padding: 12,
    mainAxisAlignment: 'center',
    crossAxisAlignment: 'start',
  },
  title: {
    color: '#212121',
    size: 24,
    weight: 'semiBold',
  },
  content: {
    marginVertical: 18,
  },
  image: {
    scale: 'center',
    width: 260,
    height: 260,
  },
  price: {
    marginVertical: 30,
  },
  inCart: {
    color: '#2E8B57',
    size: 18,
    weight: 'bold',
    marginBottom: 24,
  },
  description: {
    color: '#212121',
    size: 18,
    weight: 'light',
  },
}

export const Product: Screen = () => {
  const product = globalState.get('currentProduct')
  const cart = globalState.get('cart')
  const addToCart = [
    updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
    cart.set(insert(cart, product)),
  ]

  return (
    <ScreenComponent title="Product details">
      <ScrollView>
        <Container style={styles.wrapper}>
          <Text style={styles.title}>{product.get('title')}</Text>
          <Container style={styles.content}>
            <RemoteImage url={product.get('image').toString()} style={styles.image} />
            <Text style={styles.price}>{formatPrice(product.get('price'), 'BRL')}</Text>
            <If condition={contains(cart, product)}>
              <Then>
                <Text style={styles.inCart}>In cart ✓</Text>
              </Then>
              <Else>
                <Button onPress={addToCart}>Add to cart</Button>
              </Else>
            </If>
          </Container>
          <Text style={styles.description}>{product.get('description')}</Text>
        </Container>
      </ScrollView>
    </ScreenComponent>
  )
}
