import { coreNamespace } from '../../../constants'
import { Component } from '../../../model/component'
import { FragmentFactory } from './types'

export const fragmentName = 'fragment'

export const nimbusFragmentFactory: FragmentFactory = (children: any[]) =>
  new Component({ namespace: coreNamespace, name: fragmentName, children })
