import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponent } from './styled'
import { BoxProps } from './types/box'

export const FlowRow: FC<BoxProps> = ({ id, state, children, style, ...props }) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name="flowRow"
    state={state}
    style={style}
    properties={props}
  >
    {children}
  </StyledComponent>
)