import { Operation } from '../../api'
import { AnyNumber, Expression } from '../../types'

/**
 * Multiplies all the arguments passed.
 *
 * Example: `multiply(a, b, c, d)` results in `a * b * c * d`.
 *
 * @param values the numerical values to multiply.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const multiply = (...numbers: Expression<AnyNumber>[]) => new Operation<number>('multiply', numbers)
