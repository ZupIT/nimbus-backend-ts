import { createStateNode, Operation } from 'src'
import { gt } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('gt', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<boolean> = gt(numberState, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('gt')
        expect(op.args).toEqual([numberState, 10])
      })
    })
  })
})
