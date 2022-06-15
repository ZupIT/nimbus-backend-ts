import { setState, SetStateParams } from 'src/actions/set-state'
import { expectActionToBeCorrect } from './utils'

const properties: SetStateParams = {
  value: 18,
  path: 'user.age',
}

describe('Actions', () => {
  describe('setState', () => {
    it('should create action', () => expectActionToBeCorrect(
      setState({ ...properties }),
      'setState',
      properties,
    ))
  })
})
