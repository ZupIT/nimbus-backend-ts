import { Operation } from '../../api'
import { Expression } from '../../types'

export const uppercase = (text: Expression<string>) => new Operation<string>('uppercase', [text])
