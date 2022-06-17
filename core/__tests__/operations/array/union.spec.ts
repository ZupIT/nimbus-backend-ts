import { createStateNode, Operation } from 'src'
import { union } from 'src/operations/array'

describe('operations', () => {
  describe('array', () => {
    describe('union', () => {
      const arrayState = createStateNode<string[]>('stt')
      it('should create operation "union"', () => {
        const arrayState2 = createStateNode<string[]>('stt2')
        const arrayState3 = createStateNode<string[]>('stt3')
        const op: Operation<string[]> = union(arrayState, arrayState2, arrayState3)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('union')
        expect(op.args).toEqual([arrayState, arrayState2, arrayState3])
      })
    })
  })
})
