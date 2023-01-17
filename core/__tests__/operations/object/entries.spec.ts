import { createStateNode, Operation } from 'src'
import { entries } from 'src/operations/object'

describe('operations', () => {
  describe('object', () => {
    describe('entries', () => {
      it('should create operation "entries"', () => {
        const mapState = createStateNode<Record<string, number>>('stt')
        const op: Operation<{ key: string, value: number }[]> = entries(mapState)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('entries')
        expect(op.args).toEqual([mapState])
      })
    })
  })
})
