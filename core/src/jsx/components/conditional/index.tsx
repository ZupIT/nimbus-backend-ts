import { NimbusJSX } from '../..'
import { FC } from '../../../api'
import { coreNamespace } from '../../../constants'
import { IfProps, ThenElseProps } from './types'

const validateChild = (child?: JSX.Element) => {
  if (!child) return
  const { name, namespace } = child
  const isValid = namespace === coreNamespace && ['then', 'else'].includes(name)
  if (!isValid) {
    throw new Error(
      `The If component must only have the components Then and Else as children. Received: ${namespace}:${name}.`,
    )
  }
}

/**
 * This is a helper component. It makes it easier to make conditional rendering with the styles. This should always
 * be used with its Then and Else companions. See the example below:
 *
 * Suppose `isLoading` is a Context and it stores a boolean value.
 *
 * @example
 * ```tsx
 * <If condition={isLoading}>
 *   <Then><>Loading...</></Then>
 *   <Else><>Loading is completed!</></Else>
 * </If>
 * ```
 *
 * The children of If must always be a Then and an Else. The Else being optional.
 *
 * When `If` has only `Then` as a child, no enclosing child is created and both the id and style of the If component
 * are ignored.
 *
 * @category Component
 * @param props the component properties. See: {@link IfProps}
 * @returns a Container with the child of Then and the child of Else with the proper style.display. Or the child of
 * Then, with no enclosing container, if no Else is provided.
 */
 export const If: FC<IfProps> = ({ children, ...props }) => {
  const thenElse = Array.isArray(children) ? children : [children]
  thenElse.forEach(validateChild)

  const thenChild = thenElse.find(c => `${c?.namespace}:${c?.name}` === `${coreNamespace}:then`)?.children
  if (!thenChild) throw Error('The If component must have the component Then as child')

  return <component namespace={coreNamespace} name="if" properties={props}>{children}</component>
}

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Then = ({ children }: ThenElseProps) => (
  <component namespace={coreNamespace} name="then">{children}</component>
)

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Else = ({ children }: ThenElseProps) => (
  <component namespace={coreNamespace} name="else">{children}</component>
)
