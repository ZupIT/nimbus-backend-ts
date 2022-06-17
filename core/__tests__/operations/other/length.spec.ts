import { createStateNode, Operation } from 'src'
import { length } from 'src/operations'

describe('operations', () => {
  describe('other', () => {
    describe('length', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<number> = length(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('length')
        expect(op.args).toEqual([state])
      })
    })
  })
})
