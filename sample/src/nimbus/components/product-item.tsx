import { Actions, NimbusJSX, Expression, FC } from '@zup-it/nimbus-backend-core'

interface Props {
  productId: Expression<number>,
  image: Expression<string>,
  title: Expression<string>,
  price: Expression<string>,
  inCart?: Expression<boolean>,
  onPressBuy: Actions,
  onPressDetails: Actions,
}

export const ProductItem: FC<Props> = ({ id, ...props }) => (
  <component name="productItem" id={id} properties={props} />
)
