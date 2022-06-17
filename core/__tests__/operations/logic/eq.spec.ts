import { createStateNode, Operation } from 'src'
import { eq } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('eq', () => {
      it('should create operation', () => {
        const state = createStateNode<boolean>('stt')
        const op: Operation<boolean> = eq(state, 66.92)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('eq')
        expect(op.args).toEqual([state, 66.92])
      })
    })
  })
})
