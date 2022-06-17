import { Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'

export const eq = (a: ValidOperationAttribute, b: ValidOperationAttribute) => new Operation<boolean>('eq', [a, b])
