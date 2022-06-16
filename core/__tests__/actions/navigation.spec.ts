import { Component } from 'src'
import { StateNode } from 'src/model/state/state-node'
import { PopToParams, popTo, PopParams, pop, PushParams, push, DismissParams, dismiss, PresentParams, present } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

describe('Actions', () => {
  describe('navigation', () => {
    describe('popTo', () => {
      const properties: PopToParams = {
        route: 'test',
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        popTo({ ...properties }),
        'popTo',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        popTo('test'),
        'popTo',
        { route: 'test' },
      ))
    })

    describe('pop', () => {
      const properties: PopParams = {
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        pop(properties),
        'pop',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action without properties', () => expectActionToBeCorrect(pop(), 'pop'))
    })

    describe('dismiss', () => {
      const properties: DismissParams = {
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        dismiss(properties),
        'dismiss',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action without properties', () => expectActionToBeCorrect(dismiss(), 'dismiss'))
    })

    describe('push', () => {
      const properties: PushParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        push({ ...properties }),
        'push',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        push('test'),
        'push',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action with', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(push(localRouteProps), 'push', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => push(localRouteProps)).toThrow()
        })
      })
    })

    describe('present', () => {
      const properties: PresentParams = {
        route: {
          url: new StateNode<string>(''),
          fallback: new Component({ name: 'fallback' }),
          httpAdditionalData: { headers: { test: 'test' } },
          shouldPrefetch: false,
        },
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        present({ ...properties }),
        'present',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        present('test'),
        'present',
        { route: { url: 'test' } },
      ))

      describe('local route', () => {
        it('should create action with', () => {
          const localRouteProps = { route: { screen: new Component({ id: 'test-screen', name: 'screen' }) } }
          expectActionToBeCorrect(present(localRouteProps), 'present', localRouteProps)
        })

        it('should throw when an id is not provided', () => {
          const localRouteProps = { route: { screen: new Component({ name: 'screen' }) } }
          expect(() => present(localRouteProps)).toThrow()
        })
      })
    })
  })
})
