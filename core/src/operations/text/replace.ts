import { Operation } from '../../api'
import { Expression } from '../../types'

export const replace = (text: Expression<string>, oldTerm: Expression<string>, newTerm: Expression<string>) =>
  new Operation<string>('replace', [text, oldTerm, newTerm])
