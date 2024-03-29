import { coreNamespace } from '../constants'
import { Action, ActionFunction } from '../model/action'

/**
 * Creates an action in the core namespace.
 * @param name the name of the action
 * @returns the action factory
 */
export const createCoreAction = <Props = any>(name: string): ActionFunction<Props> => ({ ...properties }) =>
  new Action({ name, namespace: coreNamespace, properties })
