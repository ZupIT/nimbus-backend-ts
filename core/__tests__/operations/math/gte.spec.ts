import { createStateNode, Operation } from 'src'
import { gte } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('gte', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<boolean> = gte(numberState, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('gte')
        expect(op.args).toEqual([numberState, 10])
      })
    })
  })
})
