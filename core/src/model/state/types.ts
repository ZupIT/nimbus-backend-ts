import { RootState } from './root-state'
import { StateNode } from './state-node'

type Primitive = string | boolean | number

// any node

/**
 * An instance of StateNode<T> where T is a string, number or boolean.
 */
export type PrimitiveStateNode<T> = Omit<StateNode<T>, 'get' | 'at'>

/**
 * An instance of StateNode<T> where T is a map. Its fields can be accessed via the method "get".
 */
export type MapStateNode<T> = PrimitiveStateNode<T> & {
  /**
   * Gets a reference to the value of the property `key` in this MapStateNode.
   *
   * @param key the key of the property to get a reference to
   * @returns the StateNode that refers to the value at the given key
   */
  get<K extends keyof T>(key: K): State<T[K]>,
}

/**
 * An instance of StateNode<T> where T is an array. Its positions can be accessed via the method "at".
 */
export type ArrayStateNode<T> = PrimitiveStateNode<T> & {
  /**
   * Gets a reference to the value of this ArrayStateNode at the given position.
   *
   * @param index the position in the array
   * @returns the StateNode that refers to the position at index
   */
  at<I extends number>(index: I): T extends any[] ? State<T[I]> : never,
}

type StateWithoutUndefined<T> = [T] extends [Primitive] ? PrimitiveStateNode<T> : (
  T extends any[] ? ArrayStateNode<T> : MapStateNode<T>
)

type RemoveUndefined<T> = T extends undefined ? never : T

/**
 * This type helper correctly identifies the type of StateNode<T> and returns the appropriate type of
 * {@link StateNode}.
 */
// The brackets in the line below are important to prevent TS from applying a distributive operation.
export type State<T> = StateWithoutUndefined<RemoveUndefined<T>>

// root node

/**
 * An instance of RootState<T> where T is a string, number or boolean.
 */
type PrimitiveRootState<T> = Omit<RootState<T>, 'get' | 'at'>

/**
 * An instance of RootState<T> where T is a map. Its fields can be accessed via the method "get".
 */
type MapRootState<T> = PrimitiveRootState<T> & {
  get: MapStateNode<T>['get'],
}

/**
 * An instance of RootState<T> where T is an array. Its positions can be accessed via the method "at".
 */
type ArrayRootState<T> = PrimitiveRootState<T> & {
  at: ArrayStateNode<T>['at'],
}

/**
 * This type helper correctly identifies the type of RootState<T> and returns the appropriate type of
 * {@link RootState}.
 */
export type LocalState<T> = T extends boolean ? PrimitiveRootState<boolean> :(
  T extends Primitive ? PrimitiveRootState<T> : (
    T extends any[] ? ArrayRootState<T> : MapRootState<T>
  )
)
