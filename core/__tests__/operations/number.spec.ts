import { createStateNode, Operation } from 'src'
import { divide, gt, gte, lt, lte, multiply, subtract, sum } from 'src/operations/number'

describe('Operations: number', () => {
  it('should create operation "divide"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<number> = divide(numberState, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('divide')
    expect(op.args).toEqual([numberState, 5, 10])
  })

  it('should create operation "gt"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<boolean> = gt(numberState, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('gt')
    expect(op.args).toEqual([numberState, 10])
  })

  it('should create operation "gte"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<boolean> = gte(numberState, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('gte')
    expect(op.args).toEqual([numberState, 10])
  })

  it('should create operation "lt"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<boolean> = lt(numberState, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('lt')
    expect(op.args).toEqual([numberState, 10])
  })

  it('should create operation "lte"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<boolean> = lte(numberState, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('lte')
    expect(op.args).toEqual([numberState, 10])
  })

  it('should create operation "multiply"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<number> = multiply(numberState, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('multiply')
    expect(op.args).toEqual([numberState, 5, 10])
  })

  it('should create operation "subtract"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<number> = subtract(numberState, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('subtract')
    expect(op.args).toEqual([numberState, 5, 10])
  })

  it('should create operation "sum"', () => {
    const numberState = createStateNode<number>('ctx')
    const op: Operation<number> = sum(numberState, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('sum')
    expect(op.args).toEqual([numberState, 5, 10])
  })
})
