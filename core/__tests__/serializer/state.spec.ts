import { Component, serialize } from 'src'
import { RootState } from 'src/model/state/root-state'
import { StateNode } from 'src/model/state/state-node'

describe('Serializer: state', () => {
  it('should declare local state', () => {
    const stt = new RootState('stt')
    const component = new Component({ name: 'test', state: stt })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).state).toEqual({ id: 'stt' })
  })

  it('should declare local state with initial value', () => {
    const stt = new RootState('stt', { a: 1, b: '2' })
    const component = new Component({ name: 'test', state: stt })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).state).toEqual({ id: 'stt', value: { a: 1, b: '2' } })
  })

  it('should serialize references to states', () => {
    const name = new StateNode('user.name')
    const component = new Component({ name: 'test', properties: { name } })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.name).toEqual('@{user.name}')
  })

  it('should serialize deep references to states (array and map)', () => {
    const name = new StateNode('user.name')
    const age = new StateNode('user.age')
    const id = new StateNode('user.documents[0]')
    const component = new Component({
      name: 'test',
      properties: {
        names: [name],
        documents: { id },
        a: { b: [1, 2, { c: [age, 10] }] },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.names).toEqual(['@{user.name}'])
    expect(JSON.parse(serialized).properties.documents).toEqual({ id: '@{user.documents[0]}' })
    expect(JSON.parse(serialized).properties.a).toEqual({ b: [1, 2, { c: ['@{user.age}', 10] }] })
  })
})
