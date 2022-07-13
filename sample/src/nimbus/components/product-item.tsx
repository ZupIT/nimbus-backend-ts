import { Actions, NimbusJSX, FC, If, Then, Else, Operation } from '@zup-it/nimbus-backend-core'
import { PrimitiveStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Column, RemoteImage, Text } from '@zup-it/nimbus-backend-layout'
import { formatPrice } from '../operations'
import { Button } from './button'

export interface ProductItemProps {
  image: PrimitiveStateNode<string> | string,
  title: PrimitiveStateNode<string> | string,
  price: PrimitiveStateNode<number> | number,
  inCart?: Operation<boolean> | boolean,
  onPressBuy: Actions,
}

export const ProductItem: FC<ProductItemProps> = ({
  id,
  image,
  title,
  price,
  inCart,
  onPressBuy,
}) => (
  <Column
    id={id}
    backgroundColor="#fff"
    borderColor="#e3e3e3"
    borderWidth={1}
    cornerRadius={12}
    padding={12}
    mainAxisAlignment="center"
    margin={8}
  >
    <RemoteImage url={image.toString()} />
    <Text minHeight={80} color="#212121" size={14} weight="light" marginTop={8}>{title}</Text>
    <Text color="#212121" size={16} weight="semiBold" marginVertical={14}>{formatPrice(price, 'BRL')}</Text>
    <If condition={inCart ?? false}>
      <Then>
        <Text color="#2E8B57" size={18} weight="bold">In cart ✓</Text>
      </Then>
      <Else>
        <Button text="Add to cart" onPress={onPressBuy} />
      </Else>
    </If>
  </Column>
)
