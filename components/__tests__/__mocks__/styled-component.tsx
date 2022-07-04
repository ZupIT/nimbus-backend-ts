import { NimbusJSX, Component } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponentProps } from 'src/components/styled'

interface StyledFC {
  <T>(props: StyledComponentProps<T>): Component,
}

export const StyledComponentMock: StyledFC = ({ children, name, style, ...props }) => {
  const expectedProperties = { style, ...props.properties }
  return (
    <component
      name={name}
      state={props.state}
      id={props.id}
      namespace={props.namespace ?? genericNamespace}
      properties={expectedProperties}>
      {children}
    </component>
  )
}
