import { Operation } from '../../api'
import { DynamicExpression } from '../../types'

/* The following function will always return any[] despite the type of the arrays passed as parameters. This is not
ideal, but I'm not sure if it's possible to correctly type it. The difficult lies in the fact that it can receive
any number of arrays to unite. */

/**
 * Concatenates a series of arrays in a single array.
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
 *     {union(myArrays.get('array1'), myArrays.get('array2'), myArrays.get('array3'))}
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
export const union = (...arrays: DynamicExpression<any[]>[]) => new Operation<any[]>('union', arrays)
