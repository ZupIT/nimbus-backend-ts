import { Component } from '../../../api'
import { genericNamespace } from '../../../constants'
import { NimbusJSX } from '../../../jsx'
import { FC } from '../../types'
import { ILayoutCoreComponent, StyledComponentProps } from './types'

interface GetStyleComponent {
  <T>(props: StyledComponentProps<T>): Component,
}

const getComponent: GetStyleComponent = ({ name, style, children, state, id, namespace, properties }) => (
  <component name={name} state={state} id={id} namespace={namespace} properties={{ style, ...properties }}>
    {children}
  </component>
)

/**
 * Use it to create components used as default Layout components.
 *
 * @category Components
 * @param props {@link LayoutCoreComponent}.
 * @returns JSX element, i.e an instance of Component.
 */
export const LayoutCoreComponent: ILayoutCoreComponent =
  (props) => getComponent({ ...props, namespace: genericNamespace })

/**
 * Use it to create components that supports the Nimbus style protocol.
 *
 * @category Components
 * @param props {@link StyledComponentProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const StyledComponent: FC<StyledComponentProps> = (props) => getComponent(props)
