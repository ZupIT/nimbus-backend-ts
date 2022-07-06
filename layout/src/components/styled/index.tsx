import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Component, WithState, WithStyle } from '@zup-it/nimbus-backend-core/model/component'

export interface StyledComponentProps<T> extends Component, WithStyle<T>, WithState {
}

interface StyledFC {
  <T>(props: StyledComponentProps<T>): Component,
}

/**
 * Use it to create components that supports the Nimbus style protocol.
 *
 * @category Components
 * @param props {@link WithStyle}.
 * @returns JSX element, i.e an instance of Component.
 */
export const StyledComponent: StyledFC = ({ name, style, children, state, id, namespace, properties }) => (
  <component {...{ name, state, id, namespace }} properties={{ ...style, ...properties }}>{children}</component>
)
