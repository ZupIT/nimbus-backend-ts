import { createStateNode, Operation } from 'src'
import { lowercase } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('lowercase', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = lowercase(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('lowercase')
        expect(op.args).toEqual([state])
      })
    })
  })
})
