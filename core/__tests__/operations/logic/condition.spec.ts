import { createStateNode, Operation } from 'src'
import { condition } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('condition', () => {
      it('should create operation', () => {
        const boolState = createStateNode<boolean>('stt')
        const op: Operation<string | number> = condition(boolState, 'str', 5)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('condition')
        expect(op.args).toEqual([boolState, 'str', 5])
      })
    })
  })
})
