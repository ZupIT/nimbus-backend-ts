export type AdaptiveSize = number | 'fitContent' | 'expand'

export interface Size {
  width?: AdaptiveSize,
  height?: AdaptiveSize,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  /**
   *  @default false
   */
  clipped?: boolean,
}
