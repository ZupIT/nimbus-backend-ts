import { Operation } from '../../api'
import { StringOrArray } from '../type'

/**
 * Gets the length of the array or string.
 *
 * @param value the value to get length from.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const length = (value: StringOrArray) => new Operation<number>('length', [value])
