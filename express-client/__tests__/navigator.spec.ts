import { Component } from '@zup-it/nimbus-backend-core'
import { popTo, pop, push, present, dismiss } from '@zup-it/nimbus-backend-core/actions'
import { omit } from 'lodash'
import { Navigator } from 'src/navigator'
import { RouteMap } from 'src/route'
import { Screen } from 'src'

describe('Navigator', () => {
  const component = new Component({ name: 'test' })
  const screenA = () => component
  const screenB = () => component
  const screenC = () => component
  const screenD = () => component
  const routes: RouteMap = {
    'my-screen-a': screenA,
    'my-screen-b': { screen: screenB },
    'my-screen-c': { method: 'post', screen: screenC },
    'my-screen-d/:id/:resource': screenD,
  }
  const navigator = new Navigator(routes)

  describe('Push and reset navigations', () => {
    function testNavigation(navigatorFn: any, actionFactory: any, options?: any) {
      const actionA = navigatorFn(screenA, options)
      const actionB = navigatorFn(screenB, options)
      const actionC = navigatorFn(screenC, options)
      expect(actionA).toEqual(actionFactory({ route: { url: 'my-screen-a' } }))
      expect(actionB).toEqual(actionFactory({ route: { url: 'my-screen-b' } }))
      expect(actionC).toEqual(actionFactory({
        route: {
          url: 'my-screen-c',
          httpAdditionalData: { method: 'post' },
        },
      }))
    }

    it('should create actions to push', () => {
      testNavigation(navigator.push, push)
    })

    it('should create actions to present', () => {
      testNavigation(navigator.present, present)
    })

    it('should throw error when navigating to unregistered screen', () => {
      expect(() => navigator.push(() => component)).toThrow()
      expect(() => navigator.present(() => component)).toThrow()
    })
  })

  describe('Pop navigations', () => {
    it('should create action to popView', () => {
      const action = navigator.pop()
      expect(action).toEqual(pop())
    })

    it('should create action to popToView', () => {
      const actionA = navigator.popTo(screenA)
      const actionC = navigator.popTo(screenC)
      expect(actionA).toEqual(popTo({ route: 'my-screen-a' }))
      expect(actionC).toEqual(popTo({ route: 'my-screen-c' }))
    })
  })

  describe('Dismiss navigation', () => {
    it('should create action to dismiss', () => {
      const action = navigator.dismiss()
      expect(action).toEqual(dismiss())
    })
  })

  describe('Options', () => {
    function testActionWithOptions(screen: Screen, navigationFn: any, options: any, expected: any) {
      const action = (navigationFn === navigator.pop || navigationFn === navigator.dismiss)
        ? navigationFn(options)
        : navigationFn(screen, options)
      expect(action).toEqual(expected)
    }

    function testAllPushResetActions(
      options: any,
      expectedParams: any,
      { exclude = [], screen = screenA }: { exclude?: string[], screen?: Screen } = {}) {
      if (!exclude.includes('push')) {
        testActionWithOptions(screen, navigator.push, options, push(expectedParams))
      }
    }

    function testAllPopActions(options: any, expectedParams: any, screen: Screen = screenA) {
      testActionWithOptions(screen, navigator.pop, options, pop(omit(expectedParams, 'route')))
      testActionWithOptions(screen, navigator.popTo, options, popTo(expectedParams))
    }

    it('should create action with request body', () => {
      const body = { a: 1, b: 2, c: '3' }
      testAllPushResetActions(
        { body },
        { route: { url: expect.any(String), httpAdditionalData: { body, method: 'post' } } },
        { screen: screenC },
      )
    })

    it('should create action with controllerId', () => {
      const controllerId = 'test'
      testAllPushResetActions(
        { controllerId },
        { route: { url: expect.any(String) }, controllerId },
        { exclude: ['pushView'] },
      )
    })

    it('should create action with fallback', () => {
      const fallback = new Component({ name: 'fallback' })
      testAllPushResetActions({ fallback }, { route: { url: expect.any(String), fallback } })
    })

    it('should create action with headers', () => {
      const headers = { 'my-header': 'my-value' }
      testAllPushResetActions({ headers }, { route: { url: expect.any(String), httpAdditionalData: { headers } } })
    })

    it('should create action with navigationState', () => {
      const navigationState = { address: { zip: '00000000' } }
      testAllPushResetActions({ navigationState }, { route: { url: expect.any(String) }, navigationState })
      testAllPopActions({ navigationState }, { route: expect.any(String), navigationState })
    })

    it('should create action with query params', () => {
      const query = { a: 'hello world', b: '&?' }
      const expectedUrl = expect.stringMatching(/\?((a=hello%20world&b=%26%3F)|(b=%26%3F&a=hello%20world))$/)
      testAllPushResetActions(
        { query },
        { route: { url: expectedUrl },
      })
      testActionWithOptions(screenA, navigator.popTo, { query }, popTo({ route: expectedUrl }))
    })

    it('should create action with route params', () => {
      const routeParams = { id: 'a & b', resource: 'test' }
      const expectedUrl = 'my-screen-d/a%20%26%20b/test'
      testAllPushResetActions(
        { routeParams },
        { route: { url: expectedUrl } },
        { screen: screenD },
      )
      testActionWithOptions(screenD, navigator.popTo, { routeParams }, popTo({ route: expectedUrl }))
    })

    it('should create action with shouldPrefetch', () => {
      const shouldPrefetch = true
      testAllPushResetActions({ shouldPrefetch }, { route: { url: expect.any(String), shouldPrefetch } })
    })
  })
})
