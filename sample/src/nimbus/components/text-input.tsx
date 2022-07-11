import { NimbusJSX, FC, Actions, Operation, Expression } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { PrimitiveStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { customComponentNamespace } from './shared'

export interface TextInputProps extends WithStyle {
  onChange?: (value: Expression<string>) => Actions,
  onBlur?: (value: Expression<string>) => Actions,
  value: PrimitiveStateNode<string> | string,
  placeholder: PrimitiveStateNode<string> | Operation<string> | string,
}

export const TextInput: FC<TextInputProps> = ({ id, style, ...props }) => (
  <component
    id={id}
    namespace={customComponentNamespace}
    name="textInput"
    properties={{ ...style, ...props } }
  />
)
