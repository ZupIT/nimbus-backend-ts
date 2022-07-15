import { NimbusJSX } from '../..'
import { Component, createStateNode } from '../../../api'
import { coreNamespace } from '../../../constants'
import { ForEachProps } from './types'

interface ForEachFC {
  <T>(props: ForEachProps<T>): Component,
}

export const ForEach: ForEachFC = ({ key, iteratorName, indexName, children, ...props }) => (
  <component namespace={coreNamespace} name="forEach" properties={{ key, iteratorName, indexName, ...props }}>
    {children(createStateNode(iteratorName ?? 'item'), createStateNode(indexName ?? 'index'))}
  </component>
)
