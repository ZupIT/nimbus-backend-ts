import { DynamicExpression, Expression, Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'

interface Length {
  /**
   * Gets the length of the array.
   *
   * @param array the array to get length from.
   * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
   */
  (array: DynamicExpression<any[]>): Operation<number>,
  /**
   * Gets the length of the map.
   *
   * @param array the map to get length from.
   * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
   */
  (map: DynamicExpression<{ [key: string]: any }>): Operation<number>,
  /**
   * Gets the length of the string.
   *
   * @param array the string to get length from.
   * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
   */
  (string: Expression<string>): Operation<number>,
}


export const length: Length = (value: ValidOperationAttribute) => new Operation<number>('length', [value])
