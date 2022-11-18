import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { ContainerProps } from '../api'

export const LazyRow: FC<ContainerProps> = ({ id, state, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="lazyRow" state={state} properties={props}>
    {children}
  </component>
)
