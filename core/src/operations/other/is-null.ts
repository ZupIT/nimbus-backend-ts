import { Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'

/**
 * Checks if the argument is null. In web platforms it also checks for undefined.
 *
 * @param value the value to check.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const isNull = (value: ValidOperationAttribute) => new Operation<boolean>('isNull', [value])
