import { Expression } from '@zup-it/nimbus-backend-core'
import { BoxProps } from './box'

export type CrossAxisAlignment = 'start' | 'end' | 'center'
export type MainAxisAlignment = 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'

export interface ContainerProps extends BoxProps {
  /**
   * @default 'start'
  */
  crossAxisAlignment?: Expression<CrossAxisAlignment>,
  /**
   * @default 'start'
  */
  mainAxisAlignment?: Expression<MainAxisAlignment>,
}
