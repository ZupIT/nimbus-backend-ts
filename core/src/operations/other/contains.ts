import { Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'
import { DynamicExpression, Expression } from '../../types'
import { Element } from '../array/types'

interface Contains {
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
  <T>(array: DynamicExpression<T[]>, element: Element<T>): Operation<boolean>,
  /**
   * Checks if the map contains the given element.
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
   * @param map the StateNode or Operation referring to the map
   * @param element the element to look for
   * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
   */
  <T>(map: DynamicExpression<{ [key: string]: T }>, element: Element<T>): Operation<boolean>,
  /**
   * Checks if the string contains another string.
   *
   * @param string the source string
   * @param term the string to look for
   * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
   */
  (string: Expression<string>, term: Expression<string>): Operation<boolean>,
}

export const contains: Contains = (collection: ValidOperationAttribute, element: ValidOperationAttribute) => (
  new Operation<boolean>('contains', [collection, element])
)
