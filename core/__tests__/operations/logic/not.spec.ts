import { createStateNode, Operation } from 'src'
import { not } from 'src/operations'

describe('operations', () => {
  describe('logic', () => {
    describe('not', () => {
      it('should create operation', () => {
        const boolState = createStateNode<boolean>('stt')
        const op: Operation<boolean> = not(boolState)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('not')
        expect(op.args).toEqual([boolState])
      })
    })
  })
})
