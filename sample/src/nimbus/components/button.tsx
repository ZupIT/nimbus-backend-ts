import { NimbusJSX, FC, Actions, Operation } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Expression, InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { customComponentNamespace } from './shared'

export interface ButtonProps extends WithStyle {
  onPress?: Actions,
  children: InterpolatedText,
  enabled?: Expression<boolean> | Operation<boolean>,
}

export const Button: FC<ButtonProps> = ({ id, style, enabled = true, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="button" properties={{ ...style, enabled, ...props } } />
)
