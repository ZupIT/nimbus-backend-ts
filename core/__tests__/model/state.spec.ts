import { RootState, createState } from 'src/model/state/root-state'
import { StateNode, createStateNode } from 'src/model/state/state-node'
import { setState } from 'src/actions/set-state'

jest.mock('src/actions/set-state')

describe('State', () => {
  describe('StateNode', () => {
    const state = new StateNode('test.x[y]')

    it('should have a string representation', () => {
      expect(state.toString()).toBe('@{test.x[y]}')
    })

    it('should access child node via get (map)', () => {
      const child = state.get('key')
      expect(child).toBeInstanceOf(StateNode)
      expect(child.path).toBe('test.x[y].key')
    })

    it('should access child node via at (array)', () => {
      const child = state.at(0)
      expect(child).toBeInstanceOf(StateNode)
      expect(child.path).toBe('test.x[y][0]')
    })

    it('should set its own value via the action setState', () => {
      state.set(10)
      expect(setState).toHaveBeenCalledWith({
        path: 'test.x[y]',
        value: 10,
      })
    })

    it('should set root state', () => {
      const rootState = new StateNode('test')
      rootState.set(10)
      expect(setState).toHaveBeenCalledWith({
        path: 'test',
        value: 10,
      })
    })

    it('should throw error when setting state with invalid path', () => {
      const invalidState = new StateNode('-/*')
      expect(() => invalidState.set(10)).toThrow()
    })
  })

  describe('createState', () => {
    it('should create StateNode', () => {
      const state = createStateNode<number>('test.a[2]')
      expect(state).toBeInstanceOf(StateNode)
      expect(state.path).toBe('test.a[2]')
    })
  })

  describe('RootState', () => {
    it('should create a RootState', () => {
      const state = new RootState('test', 'initialValue')
      expect(state).toBeInstanceOf(StateNode)
      expect(state.path).toBe('test')
      expect(state.value).toBe('initialValue')
    })
  })

  describe('createState', () => {
    it('should create a RootState', () => {
      const state = createState<string>('test', 'initialValue')
      expect(state).toBeInstanceOf(RootState)
      expect(state.path).toBe('test')
      expect(state.value).toBe('initialValue')
    })
  })
})
