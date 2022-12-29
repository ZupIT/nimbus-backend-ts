import { NimbusJSX } from '../..'
import { Component, createStateNode } from '../../../api'
import { coreNamespace } from '../../../constants'
import { fragmentName } from '../fragment'
import { ForEachProps } from './types'

interface ForEachFC {
  <T>(props: ForEachProps<T>): Component,
}

export const ForEach: ForEachFC = ({ key, iteratorName, indexName, children, state, ...props }) => {
  /* `children` here is a function, and for this reason, its return value must be a new JSX tree, which will have its
  own root. The ForEach component though can have multiple children without wrapping everything in another component.
  For this reason, if the content is a fragment, it will be ignored, placing its children directly inside the
  ForEach. */
  const rawTemplate = children(createStateNode(iteratorName ?? 'item'), createStateNode(indexName ?? 'index'))
  const template = rawTemplate.name == fragmentName ? rawTemplate.children : rawTemplate
  return (
    <component
      namespace={coreNamespace}
      state={state}
      name="forEach"
      properties={{ key, iteratorName, indexName, ...props }}
    >
      {template}
    </component>
  )
}
