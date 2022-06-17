import { Operation } from '../../api'
import { Expression } from '../../types'

export const lowercase = (text: Expression<string>) => new Operation<string>('lowercase', [text])
