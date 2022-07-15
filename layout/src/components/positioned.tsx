import { FC, NimbusJSX, WithChildren } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
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
   * @default 'topStart'
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

export const Positioned: FC<PositionedProps> = ({ id, state, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="positioned" state={state} properties={props}>
    {children}
  </component>
)
