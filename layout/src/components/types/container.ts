import { BoxProps } from './box'

export interface ContainerProps extends BoxProps {
  /**
   * @default 'start'
  */
  crossAxisAlignment?: 'start' | 'end' | 'center',
  /**
   * @default 'start'
  */
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly',
}
