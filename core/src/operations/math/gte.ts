import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Checks if the first argument is greater than or equal to the second.
 *
 * Example: `gte(a, b)` results in `a >= b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const gte = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('gte', [left, right])
