import { createStateNode, Operation } from 'src'
import { replace } from 'src/operations'

describe('operations', () => {
  describe('text', () => {
    describe('replace', () => {
      it('should create operation', () => {
        const state = createStateNode<string>('stt')
        const op: Operation<string> = replace(state, 'test', 'replace')
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('replace')
        expect(op.args).toEqual([state, 'test', 'replace'])
      })
    })
  })
})
