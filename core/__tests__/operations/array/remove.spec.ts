import { createStateNode, Operation } from 'src'
import { remove } from 'src/operations/array'

describe('operations', () => {
  describe('array', () => {
    describe('remove', () => {
      const arrayState = createStateNode<string[]>('stt')
      it('should create operation', () => {
        const op: Operation<string[]> = remove(arrayState, 'test')
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('remove')
        expect(op.args).toEqual([arrayState, 'test'])
      })
    })
  })
})
