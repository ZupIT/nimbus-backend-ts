import { NimbusJSX, FC, Actions, Operation } from '@zup-it/nimbus-backend-core'
import { Margin } from '@zup-it/nimbus-backend-core/model/style'
import { Expression, InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { customComponentNamespace } from './shared'

export interface ButtonProps extends Margin {
  onPress?: Actions,
  text: Expression<string>,
  enabled?: Expression<boolean>,
}

export const Button: FC<ButtonProps> = ({ id, enabled, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="button" properties={{ enabled, ...props } } />
)
