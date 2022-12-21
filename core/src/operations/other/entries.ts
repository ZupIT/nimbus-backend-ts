import { DynamicExpression, Operation } from '../../api'

interface Entry<T> {
  key: string,
  value: T,
}

/**
 * Transforms a map into an array of objects of the type `{ key, value }`
 *
 * @param value the map to extract the entries from.
 * @returns an instance of Operation<Entry[]>, i.e. an operation that results in an array of entries when run by the
 * frontend.
 */
export const entries = <T>(value: DynamicExpression<{[key: string]: T}>) =>
  new Operation<Entry<T>[]>('entries', [value])
