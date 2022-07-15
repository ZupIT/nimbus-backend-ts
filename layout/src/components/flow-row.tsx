import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { BoxProps } from './types/box'

export const FlowRow: FC<BoxProps> = ({ id, state, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="flowRow" state={state} properties={props}>
    {children}
  </component>
)
