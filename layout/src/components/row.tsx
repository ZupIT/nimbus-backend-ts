import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { ContainerProps } from './types/container'

export const Row: FC<ContainerProps> = ({ id, children, state, ...props }) => (
  <component id={id} namespace={genericNamespace} name="row" state={state} properties={props}>
    {children}
  </component>
)
