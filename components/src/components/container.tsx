import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponent } from './styled'
import { ContainerProps } from './types/container'

export const Container: FC<ContainerProps> = ({
  id,
  state,
  children,
  style,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name="container"
    state={state}
    style={style}
    properties={{ stretch, crossAxisAlignment, mainAxisAlignment, ...props }}
  >
    {children}
  </StyledComponent>
)
