import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Applies the logic operator "and" between every argument passed.
 *
 * Example: `and(a, b, c, d)` results in `a and b and c and d`.
 *
 * @param values the boolean values to join.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const and = (...values: Expression<boolean>[]) => new Operation<boolean>('and', values)
