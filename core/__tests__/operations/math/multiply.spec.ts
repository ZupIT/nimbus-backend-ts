import { createStateNode, Operation } from 'src'
import { multiply } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('multiply', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<number> = multiply(numberState, 5, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('multiply')
        expect(op.args).toEqual([numberState, 5, 10])
      })
    })
  })
})
