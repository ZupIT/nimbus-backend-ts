import { NimbusJSX, FC, Actions, Operation, Expression, State, createStateNode } from '@zup-it/nimbus-backend-core'
import { BackgroundColor, Border, Margin, Padding } from '@zup-it/nimbus-backend-core/model/style'
import { customComponentNamespace } from './shared'

interface InputEvent {
  value: string,
}

export interface TextInputProps extends Margin, Padding, BackgroundColor, Border {
  onChange?: (value: State<string>) => Actions,
  onBlur?: (value: State<string>) => Actions,
  value: Expression<string>,
  placeholder: Expression<string>,
  label: Expression<string>,
}

export const TextInput: FC<TextInputProps> = ({ id, onChange, onBlur, ...props }) => {
  const onChangeActions = onChange ? onChange(createStateNode<InputEvent>('onChange').get('value')) : undefined
  const onBlurActions = onBlur ? onBlur(createStateNode<InputEvent>('onBlur').get('value')) : undefined
  const properties = { ...props, onChange: onChangeActions, onBlur: onBlurActions }
  return (
    <component id={id} namespace={customComponentNamespace} name="textInput" properties={properties} />
  )
}
