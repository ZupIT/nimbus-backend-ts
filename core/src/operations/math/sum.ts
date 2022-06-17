import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Sums all the arguments passed.
 *
 * Example: `sum(a, b, c, d)` results in `a + b + c + d`.
 *
 * @param values the numerical values to sum.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const sum = (...numbers: Expression<number>[]) => new Operation<number>('sum', numbers)
