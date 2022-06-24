import { NimbusJSX } from '../../../jsx'
import { FC, Component } from '../../../api'
import { genericNamespace } from '../../../constants'

export interface ScrollViewProps {
  /**
   * @default both
   */
  direction?: 'vertical' | 'horizontal' | 'both',
  /**
   * @default true
   */
  scrollIndicator?: boolean,
  children: Component[],
}

export const ScrollView: FC<ScrollViewProps> = ({
  children,
  direction = 'both',
  scrollIndicator = true,
  ...props
}) => (
  <component
    name="scrollView"
    namespace={genericNamespace}
    properties={{ direction, scrollIndicator, ...props }}
  >
    {children}
  </component>
)
