import { Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'
import { DynamicExpression, Expression } from '../../types'

interface Concat {
  /**
   * Concatenates a series of arrays into a single array.
   *
   * Example:
   * ```tsx
   * const myArrays = createState('myArrays', {
   *   array1: [1, 2, 3],
   *   array2: [4, 5, 6],
   *   array3: [7, 8, 9],
   * })
   *
   * const MyScreen = () => (
   *   <Text>
   *     {concat(myArrays.get('array1'), myArrays.get('array2'), myArrays.get('array3'))}
   *   </Text>
   * )
   * ```
   *
   * The screen created in the code above would print "[1, 2, 3, 4, 5, 6, 7, 8, 9]".
   *
   * The arrays passed in the parameters are not changed, instead a new array is returned.
   *
   * @param arrays the StateNodes or Operations referring to the arrays.
   * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
   */
  (...arrays: DynamicExpression<any[]>[]): Operation<any[]>,
  /**
   * Concatenates a series of maps into a single map.
   *
   * Example:
   * ```tsx
   * const myMaps = createState('myMaps', {
   *   map1: { a: 1, b: 2, c: 3 },
   *   map2: { d: 4, e: 5, f: 6 },
   *   map3: { g: 7, h: 8, i: 9 },
   * })
   *
   * const MyScreen = () => (
   *   <Text>
   *     {concat(myMaps.get('map1'), myMaps.get('map2'), myMaps.get('map3'))}
   *   </Text>
   * )
   * ```
   *
   * The screen created in the code above would print "{a=1, b=2, c=3, d=4, e=5, f=6, g=7, h=8, i=9}".
   *
   * The maps passed in the parameters are not changed, instead a new map is returned.
   *
   * @param maps the StateNodes or Operations referring to the maps.
   * @returns an instance of Operation<{ [key: string]: any }>, i.e. an operation that results in a map when run by the
   * frontend.
   */
  (...maps: DynamicExpression<{ [key: string]: any }>[]): Operation<{ [key: string]: any }[]>,
  /**
   * Concatenates a series of strings into a single string.
   *
   * Example:
   * ```tsx
   * const MyScreen = () => (
   *   <Text>
   *     {concat('abc', 'defg', 'hi')}
   *   </Text>
   * )
   * ```
   *
   * The screen created in the code above would print "abcdefghi".
   *
   * @param strings the strings to join.
   * @returns an instance of Operation<string>, i.e. an operation that results in a string when run by the frontend.
   */
  (...strings: Expression<string>[]): Operation<string>,
}

export const concat: Concat = (...terms: ValidOperationAttribute[]) => new Operation('concat', terms)
