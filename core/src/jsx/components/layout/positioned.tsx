import { FC, Component } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { BoxProps } from './shared/box-types'

type Alignment =
  'topStart' |
  'topEnd' |
  'bottomStart' |
  'bottomEnd' |
  'topCenter' |
  'bottomCenter' |
  'centerStart' |
  'centerEnd' |
  'center'

export interface PositionedProps extends BoxProps {
  /**
   * @default topStart
   */
  alignment?: Alignment,
  /**
   * @default 0
  */
  x?: number,
  /**
   * @default 0
  */
  y?: number,
  children: Component[],
}

export const Positioned: FC<PositionedProps> = ({
  children,
  style,
  alignment = 'topStart',
  x = 0,
  y = 0,
  ...props
}) => (
  <LayoutCoreComponent
    name="positioned"
    style={style}
    properties={{ alignment, x, y, ...props }}
  >
    {children}
  </LayoutCoreComponent>
)
