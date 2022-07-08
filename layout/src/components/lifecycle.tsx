import { Actions, FC, NimbusJSX, WithChildren } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

export interface LifecycleProps extends Required<WithChildren> {
  onInit?: Actions,
}

export const Lifecycle: FC<LifecycleProps> = ({ id, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="lifecycle" properties={props}>{children}</component>
)
