import { getGlobalState } from '@zup-it/nimbus-backend-core'

export interface GlobalState {
  // here you should write every property in your global state. If you don't use a global state, you can safely
  // delete this file.
}

export const globalState = getGlobalState<GlobalState>()
