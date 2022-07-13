import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { ContainerProps } from './types/container'

export const Column: FC<ContainerProps> = ({
  id,
  state,
  children,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <component
    id={id}
    namespace={genericNamespace}
    name="column"
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
