import { Expression } from '../../types'
import { Color } from './color'

export interface Border {
  /**
   *  @default 0
   */
  borderWidth?: Expression<number>,
  /**
   *  @default 1
   */
  borderDashLength?: Expression<number>,
  /**
   *  @default 0
   */
  borderDashSpacing?: Expression<number>,
  /**
   *  @default Expression<0
   */
  cornerRadius?: Expression<number>,
  /**
   *  @default '#000'
   */
  borderColor?: Expression<Color>,
}
