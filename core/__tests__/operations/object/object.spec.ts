import { Operation } from 'src'
import { object } from 'src/operations/object'

describe('operations', () => {
  describe('object', () => {
    describe('object', () => {
      it('should create operation "object"', () => {
        const objectValue = { a: 1, b: 2, c: '3' }
        const op: Operation<typeof objectValue> = object(objectValue)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('object')
        expect(op.args).toEqual(['a', 1, 'b', 2, 'c', '3'])
      })
    })
  })
})
