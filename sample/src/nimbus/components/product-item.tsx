import { Actions, NimbusJSX, FC, If, Then, Else, Operation, Expression } from '@zup-it/nimbus-backend-core'
import { PrimitiveStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Column, RemoteImage, Row, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { formatPrice } from '../operations'
import { Button } from './button'

export interface ProductItemProps {
  image: Expression<string>,
  title: Expression<string>,
  price: Expression<number>,
  inCart?: Expression<boolean>,
  onPressBuy: Actions,
  onPressDetails: Actions,
  isFirst: Expression<boolean>
  isLast: Expression<boolean>
}

export const ProductItem: FC<ProductItemProps> = ({
  id,
  image,
  title,
  price,
  inCart,
  onPressBuy,
  onPressDetails,
  isFirst,
  isLast,
}) => (
  <Column
    id={id}
    backgroundColor="#fff"
    borderColor="#e3e3e3"
    borderWidth={1}
    cornerRadius={12}
    paddingHorizontal={24}
    paddingVertical={16}
    marginVertical={6}
    {...(isFirst ? { marginTop: 0 } : {})}
    {...(isLast ? { marginBottom: 0 } : {})}
  >
    <Row>
      <Column width={104} crossAxisAlignment="center">
        <Touchable onPress={onPressDetails}>
          <RemoteImage url={image.toString()} width={80} height={100} scale="fillWidth" />
        </Touchable>
      </Column>
      <Column crossAxisAlignment="center" mainAxisAlignment="center">
        <Row paddingTop={8}>
          <Touchable onPress={onPressDetails}>
            <Text size={15} weight="light">{title}</Text>
          </Touchable>
        </Row>
        <Row paddingTop={12}>
          <Touchable onPress={onPressDetails}>
            <Text size={17} weight="bold">{formatPrice(price, 'BRL')}</Text>
          </Touchable>
        </Row>
      </Column>
    </Row>
    <Row height={1} borderColor="#e3e3e3" borderWidth={1} marginTop={20}></Row>
    <Row mainAxisAlignment="center" paddingTop={16}>
      <If condition={inCart ?? false}>
        <Then>
          <Text color="#2E8B57" size={18} weight="bold">In cart ✓</Text>
        </Then>
        <Else>
          <Button text="Add to cart" onPress={onPressBuy} />
        </Else>
      </If>
    </Row>
  </Column>
)
