import { Expression } from '../../types'

export interface Margin {
  margin?: Expression<number>,
  marginStart?: Expression<number>,
  marginEnd?: Expression<number>,
  marginTop?: Expression<number>,
  marginBottom?: Expression<number>,
  marginHorizontal?: Expression<number>,
  marginVertical?: Expression<number>,
}
