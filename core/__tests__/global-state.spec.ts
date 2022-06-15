import { getGlobalState } from 'src'
import { StateNode } from 'src/model/state/state-node'

describe('Global State', () => {
  it('should get global state', () => {
    interface MyAppState {
      username: string,
    }
    const globalState = getGlobalState<MyAppState>()
    expect(globalState).toBeInstanceOf(StateNode)
    expect(globalState.path).toBe('global')
  })
})
