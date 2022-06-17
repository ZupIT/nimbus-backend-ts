import { createStateNode, Operation } from 'src'
import { substr } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('substr', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = substr(state, 3, 6)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('substr')
        expect(op.args).toEqual([state, 3, 6])
      })
    })
  })
})
