import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Checks if the first argument is less than the second.
 *
 * Example: `lt(a, b)` results in `a < b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const lt = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('lt', [left, right])
