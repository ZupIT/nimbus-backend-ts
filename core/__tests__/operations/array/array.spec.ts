import { Operation } from 'src'
import { array } from 'src/operations/array'

describe('operations', () => {
  describe('array', () => {
    describe('array', () => {
      it('should create operation "array"', () => {
        const arrayValue = [1, 2, '3', null, true]
        const op: Operation<typeof arrayValue> = array(...arrayValue)
        expect(op).toBeInstanceOf(Operation)
        expect(op.name).toBe('array')
        expect(op.args).toEqual(arrayValue)
      })
    })
  })
})
