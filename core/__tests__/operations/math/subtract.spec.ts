import { createStateNode, Operation } from 'src'
import { subtract } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('subtract', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<number> = subtract(numberState, 5, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('subtract')
        expect(op.args).toEqual([numberState, 5, 10])
      })
    })
  })
})
