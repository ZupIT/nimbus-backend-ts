import { createStateNode, Operation } from 'src'
import { match } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('match', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<boolean> = match(state, '/[a-z]/')
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('match')
        expect(op.args).toEqual([state, '/[a-z]/'])
      })
    })
  })
})
