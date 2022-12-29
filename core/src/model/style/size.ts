import { Expression } from '../../types'

export type AdaptiveSize = number | 'fitContent' | 'expand'

export interface Size {
  width?: Expression<AdaptiveSize>,
  height?: Expression<AdaptiveSize>,
  minWidth?: Expression<number>,
  minHeight?: Expression<number>,
  maxWidth?: Expression<number>,
  maxHeight?: Expression<number>,
  /**
   *  @default false
   */
  clipped?: Expression<boolean>,
}
