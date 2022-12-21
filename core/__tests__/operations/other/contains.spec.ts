import { createStateNode, Operation } from 'src'
import { contains } from 'src/operations/other'

describe('operations', () => {
  describe('array', () => {
    describe('contains', () => {
      const arrayState = createStateNode<string[]>('stt')
      it('should create operation', () => {
        const op: Operation<boolean> = contains(arrayState, 'test')
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('contains')
        expect(op.args).toEqual([arrayState, 'test'])
      })
    })
  })
})
