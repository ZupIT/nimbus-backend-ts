import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { BoxProps } from './shared/box-types'

export const FlowRow: FC<BoxProps> = ({ children, style, ...props }) => (
  <LayoutCoreComponent name="flowRow" style={style} properties={props}>{children}</LayoutCoreComponent>
)
