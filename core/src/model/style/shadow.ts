import { Color } from './color'

export interface Shadow {
  /**
   *  @default 0
   */
  x?: number,
  /**
   *  @default 0
   */
  y?: number,
  /**
   *  @default 0
   */
  blur?: number,
  /**
   *  @default '#000'
   */
  color?: Color,
}
