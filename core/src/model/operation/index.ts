import { StateNode } from '../state/state-node'
import { ValidOperationAttribute } from './types'

/**
 * An Operation is a type of Nimbus expression, alongside the State. Operations are generally used to manipulate
 * values in the state and, just like the State is analogous to variables, the Operations are analogous to
 * functions. See the example below:
 *
 * @example
 * ```tsx
 * const counter = createState('counter', 1)
 *
 * const MyScreen = () => (
 *   <Button onPress={counter.set(new Operation<number>('sum', [counter, 1]))}>
 * )
 * ```
 *
 * Note that in Operation<T>, T is the type of the data returned by the operation. In this example, "sum", the return
 * type is a number. If the operation was "and", or "not", or "isEmpty", for instance, T would have to be boolean. If
 * it was "substring", T would be string and if it was "union", T would be Array.
 *
 * This is not very intuitive writing, so, we generally create functions, which are strictly typed, that returns
 * instances of operations. See the example below:
 * ```typescript
 * const sum = (a: Expression<number>, b: Expression<number>) => new Operation<number>('sum', [a, b])
 * ```
 *
 * And then, in our JSX code, we write:
 * ```tsx
 * const MyScreen = () => (
 *   <Button onPress={counter.set(sum(counter, 1))}>
 * )
 * ```
 */
export class Operation<ReturnType = void> {
  private static OPERATION_TYPE = 'operation'

  /**
   * @param name the name that identifies the operation in the front-end.
   * @param args an array with the arguments for running the operation. The argument can never be an array or map, only
   * numbers, strings, booleans, states or other operations can be arguments.
   */
  constructor(name: string, args: ValidOperationAttribute[]) {
    this.args = args
    this.name = name
    // @ts-ignore
    this._type = Operation.OPERATION_TYPE // avoiding strange random behavior where instanceof doesn't work
  }

  readonly name: string
  readonly args: ValidOperationAttribute[]
  /**
   * @ignore @internal
   * Reserved for internal lib usage. This ensures the correct type for the return value of an operation.
   */
  // Please, don't change the "readonly" below to "private". It is necessary for production builds.
  // @ts-ignore
  readonly _: ReturnType = null

  private asString(includeDelimiters: boolean): string {
    const argumentsAsStrings = this.args.map(item => {
      if (Operation.isOperation(item)) return (item as Operation).asString(false)
      if (StateNode.isState(item)) return (item as StateNode<unknown>).path
      if (typeof item === 'string') return `'${item}'`
      return item == null ? 'null' : item.toString()
    })
    const expression = `${this.name}(${argumentsAsStrings.join(', ')})`
    return includeDelimiters ? `@{${expression}}` : expression
  }

  /**
   * Recursively builds the Nimbus expression equivalent to this operation.
   *
   * Example: `new Operation('sum', [new Operation('multiply', [myState, 2]), 5])` becomes
   * `"@{sum(multiply(myState, 2), 5)}"`
   *
   * @returns the Nimbus expression equivalent to this Operation
   */
  toString() {
    return this.asString(true)
  }

  static isOperation(value: any | undefined | null) {
    return value instanceof Operation || value?._type === Operation.OPERATION_TYPE
  }
}
