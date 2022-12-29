import { Expression } from '../../types'

export interface Padding {
  padding?: Expression<number>,
  paddingStart?: Expression<number>,
  paddingEnd?: Expression<number>,
  paddingTop?: Expression<number>,
  paddingBottom?: Expression<number>,
  paddingHorizontal?: Expression<number>,
  paddingVertical?: Expression<number>,
}
