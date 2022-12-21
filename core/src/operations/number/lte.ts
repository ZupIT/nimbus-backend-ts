import { Operation } from '../../api'
import { AnyNumber, Expression } from '../../types'

/**
 * Checks if the first argument is less than or equal to the second.
 *
 * Example: `lte(a, b)` results in `a <= b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const lte = (
  left: Expression<AnyNumber>,
  right: Expression<AnyNumber>,
) => new Operation<boolean>('lte', [left, right])
