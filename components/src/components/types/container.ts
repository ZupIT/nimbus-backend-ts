import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { BoxProps, BoxStyle } from './box'

export interface ContainerStyle extends BoxStyle {
  flex?: number,
  /**
   * @default false
   */
  stretch?: boolean,
  /**
   * @default start
  */
  crossAxisAlignment?: 'start' | 'end' | 'center',
  /**
   * @default start
  */
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly',
}

export interface ContainerProps extends Omit<BoxProps, 'style'>, WithStyle<ContainerStyle> {
}
