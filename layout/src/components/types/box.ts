import { WithChildren, WithState, WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Border, Margin, Padding, Shadow, Size } from '@zup-it/nimbus-backend-core/model/style'

export interface BoxStyle extends Margin, Padding, Size, Border {
  backgroundColor?: string,
  shadow?: Shadow[],
}

export interface BoxProps extends WithStyle<BoxStyle>, WithState, WithChildren {
}
