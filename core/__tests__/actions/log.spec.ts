import { log, LogParams } from 'src/actions/log'
import { expectActionToBeCorrect } from './utils'

const properties: LogParams = {
  level: 'warning',
  message: 'This is a warning log',
}

describe('Actions', () => {
  describe('log', () => {
    it('should create action', () => expectActionToBeCorrect(
      log({ ...properties }),
      'log',
      properties,
    ))
  })
})
