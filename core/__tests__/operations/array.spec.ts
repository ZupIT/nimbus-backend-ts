import { createStateNode, Operation } from 'src'
import { contains, insert, remove, removeIndex, union } from 'src/operations/array'

describe('Operations: array', () => {
  const arrayState = createStateNode<string[]>('ctx')

  it('should create operation "contains"', () => {
    const op: Operation<boolean> = contains(arrayState, 'test')
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('contains')
    expect(op.args).toEqual([arrayState, 'test'])
  })

  it('should create operation "insert"', () => {
    const element = createStateNode<string>('element')
    const op: Operation<string[]> = insert(arrayState, element, 5)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('insert')
    expect(op.args).toEqual([arrayState, element, 5])
  })

  it('should create operation "insert" without an index', () => {
    const element = createStateNode<string>('element')
    const op: Operation<string[]> = insert(arrayState, element)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('insert')
    expect(op.args).toEqual([arrayState, element])
  })

  it('should create operation "remove"', () => {
    const op: Operation<string[]> = remove(arrayState, 'test')
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('remove')
    expect(op.args).toEqual([arrayState, 'test'])
  })

  it('should create operation "removeIndex"', () => {
    const op: Operation<string[]> = removeIndex(arrayState, 2)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('removeIndex')
    expect(op.args).toEqual([arrayState, 2])
  })

  it('should create operation "removeIndex" without an index', () => {
    const op: Operation<string[]> = removeIndex(arrayState)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('removeIndex')
    expect(op.args).toEqual([arrayState])
  })

  it('should create operation "union"', () => {
    const arrayState2 = createStateNode<string[]>('ctx2')
    const arrayState3 = createStateNode<string[]>('ctx3')
    const op: Operation<string[]> = union(arrayState, arrayState2, arrayState3)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('union')
    expect(op.args).toEqual([arrayState, arrayState2, arrayState3])
  })
})
