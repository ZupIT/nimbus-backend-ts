import { createStateNode, Operation } from 'src'
import { entries } from 'src/operations/other'

describe('operations', () => {
  describe('other', () => {
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
