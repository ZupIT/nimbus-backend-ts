import { createStateNode, Operation } from 'src'
import { capitalize } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('capitalize', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = capitalize(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('capitalize')
        expect(op.args).toEqual([state])
      })
    })
  })
})
