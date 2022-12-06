import { Actions, NimbusJSX, FC, If, Then, Else, Operation, Expression } from '@zup-it/nimbus-backend-core'
import { Column, RemoteImage, Row, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { formatPrice } from '../operations'
import { Button } from './button'

export interface ProductItemProps {
  image: Expression<string>,
  title: Expression<string>,
  price: Expression<number>,
  onPressBuy: Actions,
  onPressDetails: Actions,
}

export const ProductItem: FC<ProductItemProps> = ({
  id,
  image,
  title,
  price,
  onPressBuy,
  onPressDetails,
}) => (
  <Column
    id={id}
    backgroundColor="#FFFFFF"
    borderColor="#e3e3e3"
    borderWidth={1}
    cornerRadius={12}
    paddingHorizontal={24}
    paddingVertical={16}
    marginBottom={14}
    width="expand"
    shadow={[{ x: 1, y: 1, blur: 4, color: "#00000012" }]}
  >
    <Touchable onPress={onPressDetails}>
      <Row>
        <RemoteImage url={image.toString()} width={60} scale="fillWidth" />
        <Column marginStart={30}>
          <Text size={15}>{title}</Text>
          <Row paddingTop={12}>
            <Text size={17} weight="bold">{formatPrice(price, 'BRL')}</Text>
          </Row>
        </Column>
      </Row>
    </Touchable>
    <Row height={1} width="expand" backgroundColor="#E3E3E3" marginTop={20}></Row>
    <Row mainAxisAlignment="center" paddingTop={16} width="expand">
      <Button text="Add to cart" onPress={onPressBuy} />
    </Row>
  </Column>
)
