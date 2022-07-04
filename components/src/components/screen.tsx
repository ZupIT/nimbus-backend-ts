import { Component, FC, NimbusJSX, WithState } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'

export interface ScreenProps extends WithState {
  /**
   * @default null|undefined|[]
   */
  ignoreSafeArea?: ('top' | 'bottom' | 'trailing' | 'leading')[],
  title?: string,
  /**
   * @default true
   */
  showBackButton?: boolean,
  children: Component,
}

export const Screen: FC<ScreenProps> = ({ id, state, children, showBackButton = true, ...props }) => (
  <component
    id={id}
    state={state}
    name="screen"
    namespace={genericNamespace}
    properties={{ showBackButton, ...props }}
  >
    {children}
  </component>
)
