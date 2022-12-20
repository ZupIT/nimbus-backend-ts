import { Operation } from '../../api'
import { Expression } from '../../types'

export const substr = (text: Expression<string>, from: Expression<number>, length?: Expression<number>) =>
  new Operation<string>('substr', [text, from, length])
