import { createStateNode, Operation } from 'src'
import { divide } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('divide', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<number> = divide(numberState, 5, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('divide')
        expect(op.args).toEqual([numberState, 5, 10])
      })
    })
  })
})
