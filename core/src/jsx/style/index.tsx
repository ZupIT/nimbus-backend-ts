import { Color } from './color'

export interface Margin {
  margin?: number,
  marginStart?: number,
  marginEnd?: number,
  marginTop?: number,
  marginBottom?: number,
  marginHorizontal?: number,
  marginVertical?: number,
}

export interface Padding {
  padding?: number,
  paddingStart?: number,
  paddingEnd?: number,
  paddingTop?: number,
  paddingBottom?: number,
  paddingHorizontal?: number,
  paddingVertical?: number,
}

export interface Size {
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  /**
   *  @default false
   */
  clipped?: boolean,
}

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
   *  @default #000
   */
  color?: Color,
}

export interface TextColor {
  color?: Color,
}

export interface BackgroundColor {
  backgroundColor?: Color,
}

export interface Style extends BackgroundColor, Border, Margin, Padding, Size, Shadow {
}
