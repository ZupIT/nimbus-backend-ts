import { FC, NimbusJSX, WithChildren } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { StyledComponent } from './styled'
import { BoxProps } from './types/box'

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

export interface PositionedProps extends Omit<BoxProps, 'children'>, Required<WithChildren> {
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
}

export const Positioned: FC<PositionedProps> = ({
  id,
  state,
  children,
  style,
  alignment = 'topStart',
  x = 0,
  y = 0,
  ...props
}) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name="positioned"
    state={state}
    style={style}
    properties={{ alignment, x, y, ...props }}
  >
    {children}
  </StyledComponent>
)
