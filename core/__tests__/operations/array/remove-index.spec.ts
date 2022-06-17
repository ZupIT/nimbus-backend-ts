import { createStateNode, Operation } from 'src'
import { removeIndex } from 'src/operations/array'

describe('operations', () => {
  describe('array', () => {
    describe('removeIndex', () => {
      const arrayState = createStateNode<string[]>('stt')
      it('should create operation', () => {
        const op: Operation<string[]> = removeIndex(arrayState, 2)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('removeIndex')
        expect(op.args).toEqual([arrayState, 2])
      })

      it('should create operation without an index', () => {
        const op: Operation<string[]> = removeIndex(arrayState)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('removeIndex')
        expect(op.args).toEqual([arrayState])
      })
    })
  })
})
