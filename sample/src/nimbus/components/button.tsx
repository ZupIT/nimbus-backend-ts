import { NimbusJSX, FC, Actions } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Style } from '@zup-it/nimbus-backend-core/model/style'
import { InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { StyledComponent } from '@zup-it/nimbus-backend-layout/components/styled'
import { customComponentNamespace } from './shared'

export interface ButtonProps extends WithStyle {
  onPress?: Actions,
  children: InterpolatedText,
}

export const Button: FC<ButtonProps> = ({ id, style, ...props }) => (
  <StyledComponent id={id} namespace={customComponentNamespace} name="button" style={style} properties={props} />
)
