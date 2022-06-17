import { Operation } from '../../api'
import { DynamicExpression } from '../../types'
import { Element } from './types'

/**
 * Checks if the array contains the given element.
 *
 * The comparisons are done like this:
 *
 * 1. Check if the type is the same;
 * 2. If it's a primitive, just return a == b;
 * 3. If it's a map (object), compare every (key, value) pair, their order doesn't matter.
 * 4. If it's an array, compare all values (the order matters).
 *
 * This performs a deep comparison.
 *
 * @param array the StateNode or Operation referring to the array
 * @param element the element to look for
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const contains = <T>(array: DynamicExpression<T[]>, element: Element<T>) => (
  new Operation<boolean>('contains', [array, element])
)
