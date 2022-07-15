import { FC, NimbusJSX, WithChildren } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

export interface ScrollViewProps extends Required<WithChildren> {
  /**
   * @default 'both'
   */
  direction?: 'vertical' | 'horizontal' | 'both',
  /**
   * @default true
   */
  scrollIndicator?: boolean,
}

export const ScrollView: FC<ScrollViewProps> = ({ id, children, ...props }) => (
  <component id={id} namespace={genericNamespace} name="scrollView" properties={props}>
    {children}
  </component>
)
