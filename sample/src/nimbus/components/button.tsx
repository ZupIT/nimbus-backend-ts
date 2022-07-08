import { NimbusJSX, FC, Actions } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { customComponentNamespace } from './shared'

export interface ButtonProps extends WithStyle {
  onPress?: Actions,
  children: InterpolatedText,
}

export const Button: FC<ButtonProps> = ({ id, style, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="button" properties={{ ...style, ...props } }></component>
)
