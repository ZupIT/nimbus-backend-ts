import { FC, NimbusJSX, WithChildren, WithState } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

export interface ScreenProps extends WithState, Required<WithChildren> {
  /**
   * @default null|undefined|[]
   */
  ignoreSafeArea?: ('top' | 'bottom' | 'trailing' | 'leading')[],
  title?: string,
  /**
   * @default true
   */
  showBackButton?: boolean,
}

export const ScreenComponent: FC<ScreenProps> = ({ id, state, children, showBackButton = true, ...props }) => (
  <component id={id} state={state} name="screen" namespace={genericNamespace} properties={{ showBackButton, ...props }}>
    {children}
  </component>
)
