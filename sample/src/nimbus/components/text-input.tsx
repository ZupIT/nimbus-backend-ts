import { NimbusJSX, FC, Actions, Operation, Expression } from '@zup-it/nimbus-backend-core'
import { BackgroundColor, Border, Margin, Padding } from '@zup-it/nimbus-backend-core/model/style'
import { customComponentNamespace } from './shared'

export interface TextInputProps extends Margin, Padding, BackgroundColor, Border {
  onChange?: (value: Expression<string>) => Actions,
  onBlur?: (value: Expression<string>) => Actions,
  value: Expression<string>,
  placeholder: Expression<string>,
}

export const TextInput: FC<TextInputProps> = ({ id, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="textInput" properties={props} />
)
