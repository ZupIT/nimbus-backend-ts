import { createStateNode, Operation } from 'src'
import { lt } from 'src/operations'

describe('operations', () => {
  describe('math', () => {
    describe('lt', () => {
      it('should create operation', () => {
        const numberState = createStateNode<number>('stt')
        const op: Operation<boolean> = lt(numberState, 10)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('lt')
        expect(op.args).toEqual([numberState, 10])
      })
    })
  })
})
