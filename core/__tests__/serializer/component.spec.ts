import { Component, serialize } from 'src'

describe('Serializer: components', () => {
  it('should serialize leaf component', () => {
    const component = new Component({
      name: 'test',
      namespace: 'test-namespace',
      id: 'cp-id',
      properties: { a: 1, b: '2' },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      '_:component': 'test-namespace:test',
      id: 'cp-id',
      properties: { a: 1, b: '2' },
    })
  })

  it('should use default namespace', () => {
    const component = new Component({ name: 'test' })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)['_:component']).toBe('layout:test')
  })

  it('should serialize component with multiple children', () => {
    const component = new Component({
      name: 'test',
      namespace: 'a',
      children: [
        new Component({ name: 'another', namespace: 'a' }),
        new Component({ name: 'another', namespace: 'b' }),
      ],
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      '_:component': 'a:test',
      children: [
        { '_:component': 'a:another' },
        { '_:component': 'b:another' },
      ],
    })
  })

  it('should transform single child into array', () => {
    const component = new Component({
      name: 'test',
      children: new Component({ name: 'another', namespace: 'a' }),
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).children).toEqual([{ '_:component': 'a:another' }])
  })

  it('should serialize component inside the properties of another component', () => {
    const component = new Component({
      name: 'test',
      properties: {
        fallback: new Component({ name: 'another', namespace: 'a' }),
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.fallback).toEqual({ '_:component': 'a:another' })
  })

  it('should serialize component with other components deep in its properties (array and map)', () => {
    const component = new Component({
      name: 'test',
      namespace: 'a',
      properties: {
        title: 'hey',
        ui: {
          date: '18/03/2022',
          templates: [
            {
              condition: true,
              value: new Component({
                name: 'template1',
                namespace: 'a',
                children: [
                  new Component({ name: 'cp1', namespace: 'a' }),
                  new Component({ name: 'cp1', namespace: 'a' }),
                ],
              }),
            },
            {
              condition: false,
              value: new Component({ name: 'template2', namespace: 'a' }),
            },
          ],
        },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      '_:component': 'a:test',
      properties: {
        title: 'hey',
        ui: {
          date: '18/03/2022',
          templates: [
            {
              condition: true,
              value: {
                '_:component': 'a:template1',
                children: [
                  { '_:component': 'a:cp1' },
                  { '_:component': 'a:cp1' },
                ],
              },
            },
            {
              condition: false,
              value: { '_:component': 'a:template2' },
            },
          ],
        },
      },
    })
  })
})
