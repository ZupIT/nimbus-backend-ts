import { Expression, FC, NimbusJSX, WithChildren, WithState } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Color } from '@zup-it/nimbus-backend-core/model/style/color'

export interface ScreenProps extends WithState, Required<WithChildren> {
  /**
   * @default null|undefined|[]
   */
  ignoreSafeArea?: Expression<('top' | 'bottom' | 'trailing' | 'leading')[]>,
  title?: Expression<string>,
  safeAreaTopBackground?: Expression<Color>,
  statusBarColorScheme?: Expression<'light' | 'dark' | 'unspecified'>,
  /**
   * @default true
   */
  showBackButton?: Expression<boolean>,
}

export const ScreenComponent: FC<ScreenProps> = ({ id, state, children, ...props }) => (
  <component id={id} state={state} name="screen" namespace={genericNamespace} properties={props}>
    {children}
  </component>
)
