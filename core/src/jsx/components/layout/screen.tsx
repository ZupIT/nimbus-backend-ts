import { NimbusJSX } from '../../../jsx'
import { FC, Component } from '../../../api'
import { genericNamespace } from '../../../constants'

export interface ScreenProps {
  /**
   * @default null|undefined|[]
   */
  ignoreSafeArea?: ('top' | 'bottom' | 'trailing' | 'leading')[],
  title?: string,
  /**
   * @default true
   */
  showBackButton?: boolean,
  children: Component[],
}

export const Screen: FC<ScreenProps> = ({
  children,
  showBackButton = true,
  ...props
}) => (
  <component name="screen" namespace={genericNamespace} properties={{ showBackButton, ...props }}>{children}</component>
)
