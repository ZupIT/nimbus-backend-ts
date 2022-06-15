import { Action } from 'src/model/action'
import { conditionalAction, ConditionalActionParams } from 'src/actions'
import { StateNode } from 'src/model/state/state-node'
import { expectActionToBeCorrect } from './utils'

const properties: ConditionalActionParams = {
  condition: new StateNode<boolean>(''),
  onFalse: new Action({ name: 'test false' }),
  onTrue: new Action({ name: 'test true' }),
}

describe('Actions', () => {
  describe('condition', () => {
    it('should create action', () => expectActionToBeCorrect(
      conditionalAction({ ...properties }),
      'condition',
      properties,
    ))
  })
})
