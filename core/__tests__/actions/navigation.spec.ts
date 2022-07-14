import { Component } from 'src'
import { StateNode } from 'src/model/state/state-node'
import { popTo, pop, push, dismiss, present, PopToProperties, BaseNavigationParams, PushProperties } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

describe('Actions', () => {
  describe('navigation', () => {
    describe('popTo', () => {
      const properties: PopToProperties = {
        url: 'test',
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        popTo(properties),
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
      const properties: BaseNavigationParams = {
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
      const properties: BaseNavigationParams = {
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
      const properties: PushProperties = {
        url: new StateNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        headers: { test: 'test' },
        prefetch: false,
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        push(properties),
        'push',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        push('test'),
        'push',
        { route: { url: 'test' } },
      ))
    })

    describe('present', () => {
      const properties: PushProperties = {
        url: new StateNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        headers: { test: 'test' },
        prefetch: false,
        navigationState: { test: 'test' },
      }

      it('should create action', () => expectActionToBeCorrect(
        present(properties),
        'present',
        { ...properties, navigationState: expect.any(Object) },
      ))

      it('should create action with only route', () => expectActionToBeCorrect(
        present('test'),
        'present',
        { route: { url: 'test' } },
      ))
    })
  })
})
