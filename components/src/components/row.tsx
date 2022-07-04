import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponent } from './styled'
import { ContainerProps } from './types/container'
import { buildContainerStyle } from './utils/container'

export const Row: FC<ContainerProps> = ({ id, children, style, state, ...props }) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name="row"
    state={state}
    style={buildContainerStyle(style)}
    properties={props}
  >
    {children}
  </StyledComponent>
)
