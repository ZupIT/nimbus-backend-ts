import { createStateNode, Operation } from 'src'
import { isEmpty, isNull, length } from 'src/operations/other'

describe('Operations: other', () => {
  it('should create operation "isEmpty"', () => {
    const state = createStateNode<string>('ctx')
    const op: Operation<boolean> = isEmpty(state)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('isEmpty')
    expect(op.args).toEqual([state])
  })

  it('should create operation "isNull"', () => {
    const state = createStateNode<string>('ctx')
    const op: Operation<boolean> = isNull(state)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('isNull')
    expect(op.args).toEqual([state])
  })

  it('should create operation "length"', () => {
    const state = createStateNode<string>('ctx')
    const op: Operation<number> = length(state)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('length')
    expect(op.args).toEqual([state])
  })
})
