import { isEmpty } from 'lodash'
import { setState } from '../../actions/set-state'
import { Expression } from '../../types'
import { Action } from '../action'
import { State } from './types'

/**
 * For better typing, you should use `createStateNode<T>()` instead of `new StateNode<T>()`. See
 * {@link createStateNode}.
 */
export class StateNode<T> {
  private static STATE_TYPE = 'state'

  constructor(readonly path: string) {
    // @ts-ignore
    this._type = StateNode.STATE_TYPE // avoiding strange random behavior where instanceof doesn't work
  }

  /**
   * @returns the Nimbus Expression corresponding to this StateNode
   */
  toString() {
    return `@{${this.path}}`
  }

  /**
   * This is a Nimbus Action. It translates to the setState action. Use this to change the value of this StateNode.
   *
   * @param value the new value.
   * @returns an instance of Action corresponding to a setState for this StateNode
   */
  set(value: Expression<T>): Action {
    const [, id] = this.path.match(/(\w+)\.?(.*)/) ?? []
    if (isEmpty(id)) throw new Error("Can't set state because state path is empty or invalid.")
    return setState({ path: this.path, value })
  }

  at(index: number): StateNode<any> {
    return new StateNode(`${this.path}[${index}]`)
  }

  get(key: string): StateNode<any> {
    return new StateNode(`${this.path}.${key}`)
  }

  static isState(value: any | undefined | null) {
    return value instanceof StateNode || value?._type === StateNode.STATE_TYPE
  }
}

/**
 * A State in a Nimbus application is a data structure used to store values at runtime. It is equivalent to variables
 * in a common programming language. It is important to remember that the state is only a reference, since the actual
 * value will be calculated in the front-end only, when running the server-driven screen.
 *
 * Attention: this should only be used for referring to the "globalState" or any implicit state.
 * To declare a new state, please use: `createState` instead.
 *
 * Implicit states are generally used in actions or components, the sendRequest action, for instance, has the
 * onSuccess function, which receives an implicit state named "onSuccess" that is created by the action itself. This
 * state is considered implicit because it's not created by the developer. A component example is the list view, where
 * each iteration can be referred through a StateNode named "item".
 *
 * You'll probably never need to create StateNodes yourself unless you're creating a complex action or component.
 *
 * @param id the id of the state
 * @returns an instance of StateNode
 */
export function createStateNode<T>(id: string): State<T> {
  return new StateNode<T>(id) as any
}
