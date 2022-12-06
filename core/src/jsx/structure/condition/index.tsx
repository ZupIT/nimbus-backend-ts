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
 * Controls which branch of the tree is rendered: `Then` or `Else`. If `condition` resolves to true, `Then` is rendered,
 * otherwise `Else` is rendered.
 *
 * Example: suppose `isLoading` is a state and it stores a boolean value.
 *
 * @example
 * ```tsx
 * <If condition={isLoading}>
 *   <Then><Text>Loading...</Text></Then>
 *   <Else><Text>Loading is completed!</Text></Else>
 * </If>
 * ```
 *
 * The children of `If` must always be one `Then`, one `Else` or both.
 *
 * @category Component
 * @param props the component properties. See: {@link IfProps}
 * @returns an instance of the component If
 */
export const If: FC<IfProps> = ({ children, ...props }) => {
  const thenElse = Array.isArray(children) ? children : [children]
  thenElse.forEach(validateChild)
  return <component namespace={coreNamespace} name="if" properties={props}>{children}</component>
}

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns an instance of the component Then
 */
export const Then = ({ children }: ThenElseProps) => (
  <component namespace={coreNamespace} name="then">{children}</component>
)

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns an instance of the component Else
 */
export const Else = ({ children }: ThenElseProps) => (
  <component namespace={coreNamespace} name="else">{children}</component>
)
