export { Component, WithState, WithChildren } from './model/component'
export { Expression, HttpMethod, DynamicExpression, DeepExpression } from './types'
export { RootState } from './model/state/root-state'
export { Actions, createAction } from './model/action'
export { State } from './model/state/types'
export { createStateNode } from './model/state/state-node'
export { createState } from './model/state/root-state'
export { serialize } from './serializer'
export { FC, ComponentProps } from './jsx/types'
export { isDynamicExpression, setupHotReloading } from './utils'
export { Operation } from './model/operation'
export { NimbusJSX, setFragmentFactory } from './jsx'
export { If, Then, Else, ForEach, Switch } from './jsx/structure'
export * from './operations'
import { Component } from './model/component'
export { componentValidation, ValidationFn, ValidationNode } from './validation'
export { getGlobalState } from './global-state'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /**
     * A JSX element is equivalent to an instance of the class Component.
     */
    type Element = Component

    interface ElementChildrenAttribute {
      children: 'children',
    }

    interface IntrinsicElements {
      /**
       * `<component />` is used to reference a component in the frontend, but instead of using it directly when
       * building the screen, we advise creating a strictly typed functional component that is easier to use.
       *
       * @example
       * ```tsx
       * interface MyCustomTextProps {
       *   children: string,
       *   fontFamily: string,
       *   color: string,
       *   size: string,
       * }
       *
       * export const MyCustomText: FC<MyCustomTextProps> = ({ children, id, ...other }) => (
       *   <component
       *     name="my-custom-text"
       *     namespace="custom"
       *     id={id}
       *     properties={{ ...other, text: children }}
       *   />
       * )
       * ```
       *
       * Then, when building your screen:
       * ```tsx
       * const MyScreen = () => (
       *   <MyCustomText color="#000">Hello World</MyCustomText>
       * )
       * ```
       *
       * This JSX element is equivalent to the class {@link Component}. Read its documentation for details on each
       * attribute.
       *
       */
      component: Element,
    }
  }
}
