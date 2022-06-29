import { Actions, Component, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

export interface LifecycleProps {
  onInit?: Actions,
  children: Component[],
}

export const Lifecycle: FC<LifecycleProps> = ({ id, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="lifecycle" properties={props}>{children}</component>
)
