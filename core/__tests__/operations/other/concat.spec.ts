import { createStateNode, Operation } from 'src'
import { concat } from 'src/operations/other'

describe('operations', () => {
  describe('other', () => {
    describe('concat', () => {
      it('should create operation "concat"', () => {
        const arrayState = createStateNode<string[]>('stt')
        const arrayState2 = createStateNode<string[]>('stt2')
        const arrayState3 = createStateNode<string[]>('stt3')
        const op: Operation<string[]> = concat(arrayState, arrayState2, arrayState3)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('concat')
        expect(op.args).toEqual([arrayState, arrayState2, arrayState3])
      })
    })
  })
})
