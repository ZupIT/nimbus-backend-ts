import { ValueOrResultOfExpression } from '../../types'
import { StateNode } from './state-node'
import { LocalState } from './types'

/**
 * For better typing, you should use `createState<T>()` instead of `new RootState<T>()`. See
 * {@link createState}.
 */
export class RootState<T> extends StateNode<T> {
  constructor(id: string, value?: T) {
    super(id)
    this.value = value
  }

  /**
   * This will always be true and is just a trick for ensuring type-safety in Typescript. The intent here is guarantee
   * the type StateNode is not assignable to RootState.
   */
  isRoot = true
  readonly value?: T
}

/**
 * A State in a Nimbus application is a data structure used to store values at runtime. It is equivalent to variables
 * in a common programming language. It is important to remember that the state is only a reference, since the actual
 * value will be calculated in the front-end only, when running the server-driven screen.
 *
 * This is used to create a new local state for the current tree of components. A State must be declared by using
 * the property "state" of a component. The scope of a state is only the component where it's declared and its
 * children, i.e. it's not accessible by any component outside this scope.
 *
 * @example
 * Example 1: a counter
 * ```tsx
 * const counter = createState('counter', 0)
 *
 * const MyScreen = () => (
 *   <Container>
 *     <Text>{`The button was pressed ${counter} times`}</Text>
 *     <Button onPress={counter.set(sum(counter, 1))}>+1</Button>
 *   </Container>
 * )
 * ```
 *
 * Example 2: loading user data
 * ```tsx
 * interface User {
 *   name: string,
 *   address: { street: string, number: string },
 * }
 *
 * const user = createState<User>('user')
 *
 * const loadUser = sendRequest<User>({
 *   url: 'https://myapi.com/user/1',
 *   onSuccess: (response) => user.set(response.get('data')),
 * })
 *
 * const MyScreen = () => (
 *   <Container state={user} onInit={loadUser}>
 *     <Text>{`Username: ${user.get('name')}`}</Text>
 *     <Text>{`Address: ${user.get('address').get('street'), ${user.get('address').get('number')}`}</Text>
 *   </Container>
 * )
 * ```
 *
 * @remark
 * Attention: it is very important to specify the type of the state if no initial value is provided, i.e. `T` must
 * be set in `createState<T>('id')`.
 *
 * @param id the id of the state, this is very important for debugging the application.
 * @returns an instance of RootState
 */
export function createState<T>(id: string, value?: T): LocalState<ValueOrResultOfExpression<T>> {
  return new RootState<T>(id, value) as any
}
