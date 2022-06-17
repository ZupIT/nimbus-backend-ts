import { Operation } from '../../api'
import { DynamicExpression, Expression } from '../../types'

/**
 * Removes the element of the array at the given index.
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
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the StateNode or Operation referring to the array
 * @param index the position to remove. If not provided, the last element is removed.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const removeIndex = <T>(array: DynamicExpression<T[]>, index?: Expression<number>) => (
  new Operation<T[]>('removeIndex', index == undefined ? [array] : [array, index])
)
