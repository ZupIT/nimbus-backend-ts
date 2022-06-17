import { Operation } from '../../api'
import { Expression } from '../../types'

export const concat = (...texts: Expression<string>[]) => new Operation<string>('concat', texts)
