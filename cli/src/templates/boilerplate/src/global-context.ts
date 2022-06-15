import { getGlobalState } from '@zup-it/nimbus-backend-core'

export interface GlobalState {
  message?: string,
}

export const globalState = getGlobalState<GlobalState>()
