import { Actions, NimbusJSX, Expression, FC } from '@zup-it/nimbus-backend-core'
import { customComponentNamespace } from './shared'

export interface ProductItemProps {
  productId: Expression<number>,
  image: Expression<string>,
  title: Expression<string>,
  price: Expression<string>,
  inCart?: Expression<boolean>,
  onPressBuy: Actions,
  onPressDetails: Actions,
}

export const ProductItem: FC<ProductItemProps> = ({ id, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="productItem" properties={props} />
)
