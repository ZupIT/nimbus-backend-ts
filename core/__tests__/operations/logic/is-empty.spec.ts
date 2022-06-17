import { createStateNode, Operation } from 'src'
import { isEmpty } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('isEmpty', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<boolean> = isEmpty(state)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('isEmpty')
        expect(op.args).toEqual([state])
      })
    })
  })
})
