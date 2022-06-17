import { Operation } from 'src'
import { createStateNode } from 'src'
import { concat } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('concat', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = concat(state, 'Test', 'concat text')
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('concat')
        expect(op.args).toEqual([state, 'Test', 'concat text'])
      })
    })
  })
})
