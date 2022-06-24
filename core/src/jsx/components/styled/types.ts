import { Component } from '../../../api'
import { WithStyle } from '../../../model/component'

export type LayoutCoreComponentProps<T> = Omit<StyledComponentProps<T>, 'namespace'>

export interface ILayoutCoreComponent {
  <T>(props: LayoutCoreComponentProps<T>): Component,
}

export interface StyledComponentProps<T = WithStyle['style']> extends Component {
  /**
   * The style for this component. Use it to customize the background, layout, borders, etc.
   */
  style: T,
}
