import { isEmpty, mapValues } from 'lodash'
import { genericNamespace } from '../constants'
import { Component } from '../model/component'
import { Action } from '../model/action'
import { LocalState } from '../model/state/types'
import { StateNode } from '../model/state/state-node'
import { Operation } from '../model/operation'
import { componentValidation } from '..'
import { isDevelopmentMode } from '../utils'
import { ActionCall, NimbusNode, StateDeclaration } from './types'

const asActionCall = (action: Action<any>): ActionCall => ({
  '_:action': `${action.namespace ? `${action.namespace}:` : ''}${action.name}`,
  ...(action.properties ? { properties: transformExpressionsAndActions(action.properties ?? {}) } : {}),
})

const asActionCalls = (actions: Action<any> | Action<any>[]): ActionCall[] => (
  Array.isArray(actions) ? actions.map(asActionCall) : [asActionCall(actions)]
)

const asStateDeclaration = (state: LocalState<any>): StateDeclaration => ({
  id: state.path,
  value: state.value,
})

const transformExpressionsAndActions = (value: any): any => {
  const isActions = value instanceof Action || Array.isArray(value) && value[0] instanceof Action
  if (isActions) return asActionCalls(value)
  if (value instanceof Component) return asNimbusNode(value)
  if (value instanceof StateNode || value instanceof Operation) return value.toString()
  if (Array.isArray(value)) return value.map(transformExpressionsAndActions)
  if (value && typeof value === 'object') return mapValues(value, transformExpressionsAndActions)
  return value
}

const asNimbusNode = (component: Component): NimbusNode => {
  const childrenArray = Array.isArray(component.children) || !component.children
    ? component.children
    : [component.children]

  return {
    '_:component': `${component.namespace ?? genericNamespace}:${component.name}`,
    state: component.state ? asStateDeclaration(component.state) : undefined,
    id: component.id,
    children: isEmpty(childrenArray) ? undefined : childrenArray!.map(asNimbusNode),
    ...(component.properties ? { properties: transformExpressionsAndActions(component.properties ?? {}) } : {}),
  }
}

/**
 * Transforms the entire Component tree into the JSON format expected by Nimbus.
 *
 * - Components become `{ '_:component': 'namespace:name', ... }`.
 * - Actions become `{ '_:action': 'namespace:name', ... }`.
 * - State declarations become `{ ..., state: { id: 'statePath', value: 'rootStateValue' } }`.
 * - References to states become: `"@{statePath}"`.
 * - Operations become: `"@{operationName(arguments)}"`.
 *
 * Attention: when in development mode, this function will also validate the component tree. To stop running the
 * validations, set NODE_ENV to something different than 'development'. To add validations to your own components,
 * use `componentValidation.add`.
 *
 * The validations are run after the JSX elements are translated to JS and before each component is serialized.
 *
 * @param componentTree the component tree to serialize
 * @returns the JSON string
 */
export const serialize = (componentTree: Component): string => {
  if (isDevelopmentMode()) {
    componentValidation.run(componentTree)
  }
  return JSON.stringify(asNimbusNode(componentTree))
}
