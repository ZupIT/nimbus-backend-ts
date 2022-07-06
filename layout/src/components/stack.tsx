import { Component, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { isArray } from 'lodash'
import { BoxProps } from '../api'
import { StyledComponent } from './styled'

export interface StackProps extends Omit<BoxProps, 'children'> {
  children: Component | Component[],
}

export const Stack: FC<StackProps> = ({ id, state, children, style, ...props }) => {
  const array = isArray(children) ? children : [children]
  if (array.some(c => c.namespace != 'layout' || c.name != 'positioned')) {
    throw new Error('The Stack Component only supports the Positioned Component as children.')
  }
  return (
    <StyledComponent
      id={id}
      namespace={genericNamespace}
      name="stack"
      state={state}
      style={style}
      properties={props}
    >
      {children}
    </StyledComponent>
  )
}
