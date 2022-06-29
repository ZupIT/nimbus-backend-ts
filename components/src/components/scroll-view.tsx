import { Component, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

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
  id,
  children,
  direction = 'both',
  scrollIndicator = true,
  ...props
}) => (
  <component
    id={id}
    namespace={genericNamespace}
    name="scrollView"
    properties={{ direction, scrollIndicator, ...props }}
  >
    {children}
  </component>
)
