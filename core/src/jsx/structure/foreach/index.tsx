import { NimbusJSX } from '../..'
import { Component, createStateNode } from '../../../api'
import { coreNamespace } from '../../../constants'
import { ForEachProps } from './types'

interface IForEach {
  <T>(props: ForEachProps<T>): Component,
}

export const ForEach: IForEach = ({ children, state, ...props }) => (
  <component namespace={coreNamespace} name="forEach" state={state} properties={props}>
    {children(createStateNode(props.key ?? 'item'))}
  </component>
)
