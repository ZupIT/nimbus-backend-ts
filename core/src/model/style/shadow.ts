import { Expression } from '../../types'
import { Color } from './color'

export interface Shadow {
  /**
   *  @default 0
   */
  x?: Expression<number>,
  /**
   *  @default 0
   */
  y?: Expression<number>,
  /**
   *  @default 0
   */
  blur?: Expression<number>,
  /**
   *  @default '#000'
   */
  color?: Expression<Color>,
}
