import { NimbusJSX } from '../../../jsx'
import { FC, Actions, Component } from '../../../api'
import { genericNamespace } from '../../../constants'

export interface LifecycleProps {
  onInit?: Actions,
  children: Component[],
}

export const Lifecycle: FC<LifecycleProps> = ({ children, ...props }) => (
  <component name="lifecycle" namespace={genericNamespace} properties={props}>{children}</component>
)
