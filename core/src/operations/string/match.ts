import { Operation } from '../../api'
import { Expression } from '../../types'

export const match = (text: Expression<string>, matcher: Expression<string>) =>
  new Operation<boolean>('match', [text, matcher])
