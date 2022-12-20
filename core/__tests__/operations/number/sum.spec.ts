import { createStateNode, Operation } from 'src'
import { sum } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('sum', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<number> = sum(numberState, 5, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('sum')
        expect(op.args).toEqual([numberState, 5, 10])
      })
    })
  })
})
