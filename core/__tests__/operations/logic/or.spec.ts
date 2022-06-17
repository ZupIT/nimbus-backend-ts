import { createStateNode, Operation } from 'src'
import { or } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('or', () => {
      it('should create operation', () => {
        const boolState = createStateNode<boolean>('stt')
        const op: Operation<boolean> = or(true, false, boolState)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('or')
        expect(op.args).toEqual([true, false, boolState])
      })
    })
  })
})
