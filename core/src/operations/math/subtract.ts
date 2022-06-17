import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Subtracts all the arguments passed.
 *
 * Example: `subtract(a, b, c, d)` results in `a - b - c - d`.
 *
 * @param values the numerical values to subtract.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const subtract = (...numbers: Expression<number>[]) => new Operation<number>('subtract', numbers)
