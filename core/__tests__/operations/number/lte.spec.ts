import { createStateNode, Operation } from 'src'
import { lte } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('lte', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<boolean> = lte(numberState, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('lte')
        expect(op.args).toEqual([numberState, 10])
      })
    })
  })
})
