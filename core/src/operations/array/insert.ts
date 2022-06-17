import { Operation } from '../../api'
import { DynamicExpression, Expression } from '../../types'
import { Element } from './types'

/**
 * Creates the Operation "insert", which adds an element to the array at the given index.
 *
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the StateNode or Operation referring to the array
 * @param element the new element to add
 * @param index the index to insert the element at. If not provided, the element is added to the end of the array.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const insert = <T>(array: DynamicExpression<T[]>, element: Element<T>, index?: Expression<number>) => (
  new Operation<T[]>('insert', index == undefined ? [array, element] : [array, element, index])
)
