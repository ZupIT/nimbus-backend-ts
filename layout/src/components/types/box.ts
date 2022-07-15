import { WithChildren } from '@zup-it/nimbus-backend-core/model/component'
import { Border, Margin, Padding, Shadow, Size } from '@zup-it/nimbus-backend-core/model/style'

export interface BoxProps extends Margin, Padding, Size, Border, WithChildren {
  backgroundColor?: string,
  shadow?: Shadow[],
}
