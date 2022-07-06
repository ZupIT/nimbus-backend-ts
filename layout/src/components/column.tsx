import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponent } from './styled'
import { ContainerProps } from './types/container'
import { buildContainerStyle } from './utils/container'

export const Column: FC<ContainerProps> = ({ id, state, children, style, ...props }) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name="column"
    state={state}
    style={buildContainerStyle(style)}
    properties={props}
  >
    {children}
  </StyledComponent>
)
