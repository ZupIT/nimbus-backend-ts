import { Actions, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Component, WithAccessibility } from '@zup-it/nimbus-backend-core/model/component'

export interface TouchableProps extends WithAccessibility {
  onPress: Actions,
  children: Component[],
}

export const Touchable: FC<TouchableProps> = ({ id, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="touchable" properties={props}>{children}</component>
)
