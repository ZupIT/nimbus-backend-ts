import { createStateNode, Operation } from 'src'
import { and } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('and', () => {
      it('should create operation', () => {
        const boolState = createStateNode<boolean>('stt')
        const op: Operation<boolean> = and(true, false, boolState)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('and')
        expect(op.args).toEqual([true, false, boolState])
      })
    })
  })
})
