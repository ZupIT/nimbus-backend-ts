import { Operation } from '../../api'
import { DynamicExpression } from '../../types'
import { Element } from './types'

/**
 * Removes an element from the array.
 *
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the StateNode or Operation referring to the array
 * @param element the element to remove
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const remove = <T>(array: DynamicExpression<T[]>, element: Element<T>) => (
  new Operation<T[]>('remove', [array, element])
)
