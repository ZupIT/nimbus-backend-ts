import { Operation } from '../../api'
import { Expression } from '../../types'

export const capitalize = (text: Expression<string>) => new Operation<string>('capitalize', [text])
