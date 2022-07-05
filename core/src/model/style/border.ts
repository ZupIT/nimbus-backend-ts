import { Color } from './color'

export interface Border {
  /**
   *  @default 0
   */
  borderWidth?: number,
  /**
   *  @default 1
   */
  borderDashLength?: number,
  /**
   *  @default 0
   */
  borderDashSpacing?: number,
  /**
   *  @default 0
   */
  cornerRadius?: number,
  /**
   *  @default #000
   */
  borderColor?: Color,
}
