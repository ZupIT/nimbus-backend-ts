import { NimbusJSX } from '../..'
import { Component, createStateNode } from '../../../api'
import { coreNamespace } from '../../../constants'
import { ForEachProps } from './types'

interface ForEachFC {
  <T>(props: ForEachProps<T>): Component,
}

export const ForEach: ForEachFC = ({ key = 'item', indexName = 'index', children, ...props }) => (
  <component namespace={coreNamespace} name="forEach" properties={{ key, indexName, ...props }}>
    {children(createStateNode(key), createStateNode(indexName))}
  </component>
)
