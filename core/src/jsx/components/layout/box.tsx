import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { BoxProps } from './shared/box-types'

export const Box: FC<BoxProps> = ({ children, style, ...props }) => (
  <LayoutCoreComponent name="box" style={style} properties={props}>{children}</LayoutCoreComponent>
)
