import { createStateNode, Operation } from 'src'
import { insert } from 'src/operations/array'

describe('operations', () => {
  describe('array', () => {
    describe('insert', () => {
      const arrayState = createStateNode<string[]>('stt')
      it('should create operation', () => {
        const element = createStateNode<string>('element')
        const op: Operation<string[]> = insert(arrayState, element, 5)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('insert')
        expect(op.args).toEqual([arrayState, element, 5])
      })

      it('should create operation without an index', () => {
        const element = createStateNode<string>('element')
        const op: Operation<string[]> = insert(arrayState, element)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('insert')
        expect(op.args).toEqual([arrayState, element])
      })
    })
  })
})
