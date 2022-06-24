import { Component } from '../../../../api'
import { Border, Margin, Padding, Shadow, Size } from '../../../style'
import { LayoutCoreComponentProps } from '../../styled/types'

export interface BoxStyle extends Margin, Padding, Size, Border {
  backgroundColor?: string,
  shadow?: Shadow[],
}

export interface BoxProps extends LayoutCoreComponentProps<BoxStyle> {
  children?: Component[],
}
