import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { BoxProps } from './shared/box-types'

export const FlowColumn: FC<BoxProps> = ({ children, style, ...props }) => (
  <LayoutCoreComponent name="flowColumn" style={style} properties={props}>{children}</LayoutCoreComponent>
)
