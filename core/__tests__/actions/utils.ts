import { omitBy } from 'lodash'
import { Action } from 'src/model/action'

export function expectActionToBeCorrect(
  action: Action,
  name: string,
  properties: unknown = {},
) {
  expect(action).toBeInstanceOf(Action)
  expect(action.name).toBe(name)
  expect(action.namespace).toBeUndefined()
  const validProperties = omitBy(action.properties, value => value === undefined)
  expect(validProperties).toEqual(properties)
}
