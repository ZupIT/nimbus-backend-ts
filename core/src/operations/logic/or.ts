import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Applies the logic operator "or" between every argument passed.
 *
 * Example: `or(a, b, c, d)` results in `a or b or c or d`.
 *
 * @param values the boolean values to disjoin.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const or = (...values: Expression<boolean>[]) => new Operation<boolean>('or', values)
