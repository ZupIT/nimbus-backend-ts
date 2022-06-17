import { createStateNode, Operation } from 'src'
import { uppercase } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('uppercase', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = uppercase(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('uppercase')
        expect(op.args).toEqual([state])
      })
    })
  })
})
