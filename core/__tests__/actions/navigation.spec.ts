import { Component } from 'src'
import { StateNode } from 'src/model/state/state-node'
import {
  openExternalUrl, openNativeRoute, popStack, popToView, popView, pushStack, pushView, resetApplication, resetStack,
  OpenExternalUrlParams, OpenNativeRouteParams, PopStackParams, PopToViewParams, PopViewParams, PushStackParams,
  PushViewParams, ResetApplicationParams, ResetStackParams,
} from 'src/actions'
import { expectActionToBeCorrect } from './utils'

describe('Actions', () => {
  describe('navigation', () => {
    describe('openExternalUrl', () => {
      const properties: OpenExternalUrlParams = {
        url: 'http://test.com',
      }

      it('should create action', () => expectActionToBeCorrect(
        openExternalUrl({ ...properties }),
        'openExternalUrl',
        properties,
      ))

      it('should create action with url only', () => expectActionToBeCorrect(
        openExternalUrl(properties.url),
        'openExternalUrl',
        properties,
      ))
    })

    describe('openNativeRoute', () => {
      const properties: OpenNativeRouteParams = {
        route: 'my-route',
        data: { id: '01' },
        shouldResetApplication: false,
      }

      it('should create action', () => expectActionToBeCorrect(
        openNativeRoute({ ...properties }),
        'openNativeRoute',
        properties,
      ))
    })

    describe('popStack and navigation state', () => {
      it('should create action without properties', () => expectActionToBeCorrect(popStack(), 'popStack'))

      it('should create action with simple navigation state', () => {
        const properties: PopStackParams = {
          navigationState: { test: 'test-value' },
        }
        const processed = {
          navigationState: {
            path: 'test',
            value: 'test-value',
          },
        }
        expectActionToBeCorrect(
          popStack({ ...properties }),
          'popStack',
          processed,
        )
      })

      it('should create action with complex navigation state', () => {
        const properties: PopStackParams = {
          navigationState: { user: { address: { position: { lat: 58.8, lng: -136.5 } } } },
        }
        const processed = {
          navigationState: {
            path: 'user.address.position',
            value: { lat: 58.8, lng: -136.5 },
          },
        }
        expectActionToBeCorrect(
          popStack({ ...properties }),
          'popStack',
          processed,
        )
      })

      it('should create action with a navigation state without path if the state data is invalid', () => {
        const properties: PopStackParams = {
          navigationState: { user: 'Mary', age: 30 },
        }
        const processed = {
          navigationState: { value: properties.navigationState },
        }
        expectActionToBeCorrect(
          popStack({ ...properties }),
          'popStack',
          processed,
        )
      })
    })

    describe('popToView', () => {
      const properties: PopToViewParams = {
        route: 'test',
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        popToView({ ...properties }),
        'popToView',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        popToView('test'),
        'popToView',
        { route: 'test' },
      ))
    })

    describe('popView', () => {
      const properties: PopViewParams = {
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        popView(properties),
        'popView',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action without properties', () => expectActionToBeCorrect(popView(), 'popView'))
    })

    describe('pushStack', () => {
      const properties: PushStackParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        navigationState: { test: 'test' },
        controllerId: 'my-controller',
      }

      it('should create action', () => expectActionToBeCorrect(
        pushStack({ ...properties }),
        'pushStack',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        pushStack('test'),
        'pushStack',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(pushStack(localRouteProps), 'pushStack', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => pushStack(localRouteProps)).toThrow()
        })
      })
    })

    describe('pushView', () => {
      const properties: PushViewParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        pushView({ ...properties }),
        'pushView',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        pushView('test'),
        'pushView',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action with', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(pushView(localRouteProps), 'pushView', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => pushView(localRouteProps)).toThrow()
        })
      })
    })

    describe('resetApplication', () => {
      const properties: ResetApplicationParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        controllerId: 'controller',
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        resetApplication({ ...properties }),
        'resetApplication',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        resetApplication('test'),
        'resetApplication',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(resetApplication(localRouteProps), 'resetApplication', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => resetApplication(localRouteProps)).toThrow()
        })
      })
    })

    describe('resetStack', () => {
      const properties: ResetStackParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        controllerId: 'controller',
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        resetStack({ ...properties }),
        'resetStack',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        resetStack('test'),
        'resetStack',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action with', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(resetStack(localRouteProps), 'resetStack', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => resetStack(localRouteProps)).toThrow()
        })
      })
    })
  })
})
