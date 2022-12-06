import { State } from './model/state/types'
import { Operation } from './model/operation'

/**
 * A StateNode or Operation that results in a value of the given generic.
 */
export type DynamicExpression<T> = State<T> | Operation<T>

/**
 * A StateNode or Operation that results in a value of the given generic. It can also be the value itself.
 */
export type Expression<T> = T | DynamicExpression<T>

/**
 * Same as Expression, but instead of applying it only to the root node of a map, it applies it to the whole map,
 * recursively.
 *
 * Example: if `Name` is `{ first: string, last: string }` and `User` is `{ id: number, name: Name }`,
 * `Expression<User>` is `User | State<User> | Operation<User>`, while `DeepExpression<User>` is
 * `Expression<User> | { id: Expression<number>, name: Expression<Name> | { first: Expression<string>,
 * last: Expression<string> } }`
 */
export type DeepExpression<T> = T extends (number | boolean | string | any[])
  ? Expression<T>
  : (Expression<T> | { [K in keyof T]: DeepExpression<T[K]> })

export type HttpMethod = 'Get' | 'Patch' | 'Put' | 'Post' | 'Delete'

type InterpolatedTextAcceptableTypes =
  string |
  number |
  boolean |
  State<any> |
  Operation<any> |
  { [K: string]: InterpolatedTextAcceptableTypes }

export type InterpolatedText = InterpolatedTextAcceptableTypes | InterpolatedTextAcceptableTypes[]

/**
 * If T is an expression, returns the result of the expression, otherwise returns T
 */
 export type ValueOrResultOfExpression<T> = T extends State<infer R> ? R : (T extends Operation<infer R> ? R : T)

