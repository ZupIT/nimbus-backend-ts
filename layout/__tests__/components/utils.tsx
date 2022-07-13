/* eslint-disable no-console */
import { NimbusJSX, Component } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { LocalState } from '@zup-it/nimbus-backend-core/model/state/types'

export type ComponentTestOptions<Props = unknown> = {
  properties?: Props,
  children?: Component | Component[] | null | undefined,
  id?: string,
  state?: LocalState<any>,
  namespace?: string,
}

export function expectComponentToBeCorrect<Props = unknown>(
  component: JSX.Element,
  name: string,
  options: ComponentTestOptions<Props> = {},
) {
  const { id, state, namespace, children, properties } = options
  const expectedComponent = (
    <component
      name={name}
      state={state}
      id={id}
      namespace={namespace ?? genericNamespace}
      properties={properties}>
      {children}
    </component>
  )

  expect(component).toEqual(expectedComponent)
}
