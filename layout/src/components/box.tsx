import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { BoxProps } from './types/box'

export const Box: FC<BoxProps> = ({ id, state, children, ...props }) => (
  <component id={id} name="box" namespace={genericNamespace} state={state} properties={props}>{children}</component>
)
