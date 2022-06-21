import { omitBy } from 'lodash'
import { coreNamespace } from 'src/constants'
import { Action } from 'src/model/action'

export function expectActionToBeCorrect(
  action: Action,
  name: string,
  properties: unknown = {},
) {
  expect(action).toBeInstanceOf(Action)
  expect(action.name).toBe(name)
  expect(action.namespace).toBe(coreNamespace)
  const validProperties = omitBy(action.properties, value => value === undefined)
  expect(validProperties).toEqual(properties)
}
