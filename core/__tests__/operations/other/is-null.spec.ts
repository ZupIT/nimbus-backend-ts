import { createStateNode, Operation } from 'src'
import { isNull } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('isNull', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<boolean> = isNull(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('isNull')
        expect(op.args).toEqual([state])
      })
    })
  })
})
