import { Operation } from 'src'
import { StateNode } from 'src/model/state/state-node'

describe('Operation', () => {
  const operation = new Operation('myOperation', [1, 'test', true, null])

  it('should create an Operation', () => {
    expect(operation._).toBeNull()
    expect(operation.name).toBe('myOperation')
    expect(operation.args).toEqual([1, 'test', true, null])
  })

  it('should have a string representation', () => {
    expect(operation.toString()).toBe("@{myOperation(1, 'test', true, null)}")
  })

  it('should have a string representation for operations with states in arguments', () => {
    const operation = new Operation('op', [new StateNode('user'), new StateNode('globalState.cart')])
    expect(operation.toString()).toBe('@{op(user, globalState.cart)}')
  })

  it('should have a string representation for operations with operations in arguments', () => {
    const operation = new Operation('op1', [
      new Operation('op2', [
        new StateNode('user'),
        new Operation('op3', [
          'hello',
          new Operation('op4', [1, 3]),
          new Operation('op4', [5, 10, 15]),
        ]),
        new StateNode('globalState.cart'),
      ]),
    ])
    expect(operation.toString()).toBe("@{op1(op2(user, op3('hello', op4(1, 3), op4(5, 10, 15)), globalState.cart))}")
  })
})
