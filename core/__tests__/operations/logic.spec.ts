import { createStateNode, Operation } from 'src'
import { and, condition, not, or } from 'src/operations/logic'

describe('Operations: logic', () => {
  it('should create operation "and"', () => {
    const boolState = createStateNode<boolean>('ctx')
    const op: Operation<boolean> = and(true, false, boolState)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('and')
    expect(op.args).toEqual([true, false, boolState])
  })

  it('should create operation "condition"', () => {
    const boolState = createStateNode<boolean>('ctx')
    const op: Operation<string | number> = condition(boolState, 'str', 5)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('condition')
    expect(op.args).toEqual([boolState, 'str', 5])
  })

  it('should create operation "not"', () => {
    const boolState = createStateNode<boolean>('ctx')
    const op: Operation<boolean> = not(boolState)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('not')
    expect(op.args).toEqual([boolState])
  })

  it('should create operation "or"', () => {
    const boolState = createStateNode<boolean>('ctx')
    const op: Operation<boolean> = or(true, false, boolState)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('or')
    expect(op.args).toEqual([true, false, boolState])
  })
})
