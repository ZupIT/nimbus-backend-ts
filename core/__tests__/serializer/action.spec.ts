import { Component, Operation, serialize } from 'src'
import { StateNode } from 'src/model/state/state-node'
import { Action } from 'src/model/action'

describe('Serializer: actions', () => {
  it('should serialize actions', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({ name: 'alert', namespace: 'a', properties: { message: 'hi' } }),
          new Action({ name: 'log', namespace: 'a', properties: { text: '[INFO] hi!' } }),
        ],
      },
    })
    const serialized = serialize(component)

    // eslint-disable-next-line no-console
    console.log(serialized)

    expect(JSON.parse(serialized).properties.onPress).toEqual([
      { '_:action': 'a:alert', properties: { message: 'hi' } },
      { '_:action': 'a:log', properties: { text: '[INFO] hi!' } },
    ])
  })

  it('should not use namespace', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [new Action({ name: 'alert' })],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.onPress).toEqual([
      { '_:action': 'alert' },
    ])
  })

  it('should serialize a single action into an array', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: new Action({ name: 'alert', namespace: 'a', properties: { message: 'hi' } }),
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.onPress).toEqual([
      { '_:action': 'a:alert', properties: { message: 'hi' } },
    ])
  })

  it('should serialize sub-actions (shallow and deep)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'confirm',
            namespace: 'a',
            properties: {
              onPressOk: [
                new Action({
                  name: 'sendRequest',
                  namespace: 'a',
                  properties: {
                    test: {
                      onSuccess: [
                        new Action({ name: 'alert', namespace: 'a', properties: { message: 'success' } }),
                      ],
                    },
                  },
                }),
              ],
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.onPress).toEqual([{
      '_:action': 'a:confirm',
      properties: {
        onPressOk: [{
          '_:action': 'a:sendRequest',
          properties: {
            test: {
              onSuccess: [
                { '_:action': 'a:alert', properties: { message: 'success' } },
              ],
            },
          },
        }],
      },
    }])
  })

  it('should serialize states and operations in an action (shallow and deep)', () => {
    const username = new StateNode('user.name')
    const age = new StateNode('user.age')
    const isAdult = new Operation('gt', [age, 18])
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'alert',
            properties: {
              message: username,
              display: isAdult,
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.onPress[0].properties.message).toEqual('@{user.name}')
    expect(JSON.parse(serialized).properties.onPress[0].properties.display).toEqual('@{gt(user.age, 18)}')
  })

  it('should serialize components in an action (shallow and deep)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'an-action',
            properties: {
              overlay: new Component({ name: 'test', namespace: 'a' }),
              a: { b: { c: [new Component({ name: 'test', namespace: 'b' })] } },
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.onPress[0].properties.overlay).toEqual({ '_:component': 'a:test' })
    expect(JSON.parse(serialized).properties.onPress[0].properties.a.b.c[0]).toEqual({ '_:component': 'b:test' })
  })

  it('should serialize deep actions inside components (array and map)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        a: {
          b: {
            c: {
              d: [new Action({ name: 'test', namespace: 'a' })],
            },
            e: [1, 2, 3, { f: [new Action({ name: 'test', namespace: 'b' })] }],
          },
        },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).properties.a.b.c.d[0]).toEqual({ '_:action': 'a:test' })
    expect(JSON.parse(serialized).properties.a.b.e[3].f[0]).toEqual({ '_:action': 'b:test' })
  })
})
