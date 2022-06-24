import { FC, Component } from '../../../api'
import { genericNamespace } from '../../../constants'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { BoxProps } from './shared/box-types'

export interface StackProps extends BoxProps {
  children: Component[],
}

export const Stack: FC<StackProps> = ({ children, style, ...props }) => {
  if (children.some(c => c.namespace != genericNamespace || c.name != 'positioned')) {
    throw new Error('The Stack Component only supports the Positioned Component as children.')
  }
  return <LayoutCoreComponent name="stack" style={style} properties={props}>{children}</LayoutCoreComponent>
}
