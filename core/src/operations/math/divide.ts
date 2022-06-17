import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Divides all the arguments passed.
 *
 * Example: `divide(a, b, c, d)` results in `a / b / c / d`.
 *
 * @param values the numerical values to divide.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const divide = (...numbers: Expression<number>[]) => new Operation<number>('divide', numbers)
