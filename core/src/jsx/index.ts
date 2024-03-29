import { Component } from '../model/component'
import { nimbusFragmentFactory } from './structure/fragment'
import { FragmentFactory } from './structure/fragment/types'
import { FC } from './types'

export * from './structure'

const intrinsicComponentName = 'component'

let fragmentFactory: FragmentFactory = nimbusFragmentFactory

/**
 * By default, Nimbus interprets a fragment as the components "nimbus:text" or "nimbus:column" depending if the
 * children property is a string or another JSX element.
 *
 * A fragment is identified by `<>` and `</>`.
 *
 * If the components "text" and "column" in the namespace "nimbus" don't exist in your project, you won't be able
 * to use fragments unless you use this function to set it up.
 *
 * @param factory a function that receives the children and returns the JSX.Element that should be used
 */
export const setFragmentFactory = (factory: FragmentFactory) => { fragmentFactory = factory }

/**
 * @param children the ...children arguments received by the createElement function
 * @returns the children formatted as expected by a functional component
 */
function processChildrenArgs(children: any[]) {
  if (children.length === 0) return undefined
  return children.length === 1 ? children[0] : children
}

export const NimbusJSX = {
  /**
   * Creates a javascript object from a JSX element, i.e. an element of the type `<jsx props>children</jsx>`.
   *
   * 1. If the JSX element is a functional component, it runs the functional component.
   * 2. If the JSX element is the intrinsic element `<component />`, it creates the equivalent Component by returning
   * an instance of the class Component with the properties and children passed as parameters.
   * 3. Otherwise, it throws an error saying the element is not supported.
   *
   * This function is automatically called by Typescript whenever it finds a JSX tree in the code. It's called for
   * the root of the tree like this:
   *
   * ```
   * function tsProcessJSX(node) {
   *   return NimbusJSX.createElement(
   *     node.jsx,
   *     node.props,
   *     ...node.children.map(child => isJSXElement(child) ? tsProcessJSX(child) : child),
   *   )
   * }
   * ```
   *
   * @param jsx the JSX element. Can be a functional component (FC) or an intrinsic JSX element, i.e. a `"component"`.
   * @param props the properties passed to the JSX element. In `<Button enabled={false} onPress={myAction}>`, for
   * instance, props are `{ enabled: false, onPress: myAction }`.
   * @param children the createElement function accepts any number of arguments, every argument after `jsx` and `props`
   * is considered to be a child of `jsx`. Every child that is a JSX element will have already gone through this
   * function. Since the user can pass anything in the JSX tree, a child can be anything.
   * @returns the Javascript object resulting from the JSX element
   */
  createElement: (jsx: string | FC<any>, props?: Record<string, any>, ...children: any[]): any => {
    /* the functional component must receive undefined if no children exist, a single child if one child exists or an
    array, if multiple children exist. In the next line we transform the argument array into the type expected by a
    functional component. */
    const componentChildren = processChildrenArgs(children)
    if (!jsx) return fragmentFactory(componentChildren)
    if (typeof jsx === 'function') return jsx({ ...props, children: componentChildren })
    if (jsx !== intrinsicComponentName) {
      throw new Error(`Invalid Nimbus JSX element "${jsx}". Did you mean "<${intrinsicComponentName} />"?`)
    }
    return new Component({ ...(props as Omit<Component, 'children'>), children: componentChildren })
  },
}
