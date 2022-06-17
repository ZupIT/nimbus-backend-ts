import { Operation } from '../../api'
import { Expression } from '../../types'

/**
 * Negates a boolean expression.
 *
 * @param value the boolean expression to negate
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const not = (value: Expression<boolean>) => new Operation<boolean>('not', [value])
