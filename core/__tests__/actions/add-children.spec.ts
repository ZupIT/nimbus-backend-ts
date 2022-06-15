import { Component } from 'src'
import { addChildren, AddChildrenParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: AddChildrenParams = {
  componentId: 'test',
  value: [new Component({ name: 'test' })],
  mode: 'APPEND',
}

describe('Actions', () => {
  describe('addChildren', () => {
    it('should create action', () => expectActionToBeCorrect(
      addChildren({ ...properties }), 'addChildren', properties)
    )
  })
})
