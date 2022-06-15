import { Action } from 'src/model/action'
import { confirm, ConfirmParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: ConfirmParams = {
  message: 'test message',
  title: 'test title',
  labelOk: 'hi',
  labelCancel: 'bye',
  onPressOk: new Action({ name: 'test ok' }),
  onPressCancel: new Action({ name: 'test cancel' }),
}

describe('Actions', () => {
  describe('confirm', () => {
    it('should create action', () => expectActionToBeCorrect(
      confirm({ ...properties }),
      'confirm',
      properties,
    ))

    it('should create action with only a message', () => expectActionToBeCorrect(
      confirm('test'),
      'confirm',
      { message: 'test' },
    ))
  })
})
