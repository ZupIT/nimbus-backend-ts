import { NimbusJSX } from '../..'
import { Component, createStateNode } from '../../../api'
import { ForEachProps } from './types'

interface ForEachComponent {
  <T>(props: ForEachProps<T>): Component,
}

export const ForEach: ForEachComponent = ({ children, state, ...props }) => {
  const forEachState = createStateNode<Parameters<typeof children>[0]>(props.key ?? 'item')
  return (
    <component name="forEach" state={state} properties={props}>{children(forEachState as any)}</component>
  )
}
