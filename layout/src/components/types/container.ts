import { BoxProps } from './box'

export interface ContainerProps extends BoxProps {
  flex?: number,
  /**
   * @default false
   */
  stretch?: boolean,
  /**
   * @default 'start'
  */
  crossAxisAlignment?: 'start' | 'end' | 'center',
  /**
   * @default 'start'
  */
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly',
}
