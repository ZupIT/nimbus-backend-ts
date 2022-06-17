import { Operation } from '../../api'
import { StringArrayOrMap } from '../type'

/**
 * Checks if the argument is empty.
 *
 * A map is empty if it has no keys.
 * A list is empty if it has no elements.
 * A string is empty if it has no characters.
 * Null is always empty. In web platforms, undefined is also empty.
 *
 * @param value the value to check.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const isEmpty = (value: StringArrayOrMap) => new Operation<boolean>('isEmpty', [value])
