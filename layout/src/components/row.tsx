import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { ContainerProps } from './types/container'

export const Row: FC<ContainerProps> = ({
  id,
  children,
  state,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <component
    id={id}
    namespace={genericNamespace}
    name="row"
    state={state}
    properties={{
      stretch,
      crossAxisAlignment,
      mainAxisAlignment,
      ...props,
    }}
  >
    {children}
  </component>
)
