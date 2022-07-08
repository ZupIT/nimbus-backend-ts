import { Actions, NimbusJSX, FC, If, Then, Else, Operation } from '@zup-it/nimbus-backend-core'
import { PrimitiveStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { BaseImageStyle, Container, ContainerStyle, RemoteImage, Text, TextStyle } from '@zup-it/nimbus-backend-layout'
import { formatPrice } from '../operations'
import { Button } from './button'

export interface ProductItemProps {
  image: PrimitiveStateNode<string> | string,
  title: PrimitiveStateNode<string> | string,
  price: PrimitiveStateNode<number> | number,
  inCart?: Operation<boolean> | boolean,
  onPressBuy: Actions,
}

interface ComponentStyles {
  card: ContainerStyle,
  image: BaseImageStyle,
  title: TextStyle,
  price: TextStyle,
  inCart: TextStyle,
}

const styles: ComponentStyles = {
  card: {
    backgroundColor: '#fff',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    cornerRadius: 12,
    padding: 12,
    mainAxisAlignment: 'center',
    margin: 8,
  },
  image: {
    scale: 'center',
  },
  title: {
    minHeight: 80,
    color: '#212121',
    size: 14,
    weight: 'light',
    marginTop: 8,
  },
  price: {
    color: '#212121',
    size: 16,
    weight: 'semiBold',
    marginVertical: 14,
  },
  inCart: {
    color: '#2E8B57',
    size: 18,
    weight: 'bold',
  },
}

export const ProductItem: FC<ProductItemProps> = ({
  id,
  image,
  title,
  price,
  inCart,
  onPressBuy,
}) => (
  <Container id={id} style={styles.card}>
    <RemoteImage url={image.toString()} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price}>{formatPrice(price, 'BRL')}</Text>
    <If condition={inCart ?? false}>
      <Then>
        <Text style={styles.inCart}>In cart ✓</Text>
      </Then>
      <Else>
        <Button onPress={onPressBuy}>Add to cart</Button>
      </Else>
    </If>
  </Container>
)
