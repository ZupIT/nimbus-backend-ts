import { Component } from 'src'
import { StateNode } from 'src/model/state/state-node'
import { popTo, pop, push, dismiss, present, PopToProperties, PushProperties } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

describe('Actions', () => {
  describe('navigation', () => {
    describe('popTo', () => {
      const properties: PopToProperties = {
        url: 'test',
      }

      it('should create action', () => expectActionToBeCorrect(popTo(properties), 'popTo', { ...properties }))

      it('should create action with only route', () => expectActionToBeCorrect(
        popTo('test'), 'popTo', { route: 'test' })
      )
    })

    describe('pop', () => {
      it('should create action', () => expectActionToBeCorrect(pop(), 'pop'))

      it('should create action without properties', () => expectActionToBeCorrect(pop(), 'pop'))
    })

    describe('dismiss', () => {
      it('should create action', () => expectActionToBeCorrect(dismiss(), 'dismiss'))

      it('should create action without properties', () => expectActionToBeCorrect(dismiss(), 'dismiss'))
    })

    describe('push', () => {
      const properties: PushProperties = {
        url: new StateNode<string>(''),
        fallback: new Component({ name: 'fallback' }),
        headers: { test: 'test' },
        prefetch: false,
      }

      it('should create action', () => expectActionToBeCorrect(push(properties), 'push', { ...properties }))

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
      }

      it('should create action', () => expectActionToBeCorrect(present(properties), 'present', { ...properties }))

      it('should create action with only route', () => expectActionToBeCorrect(
        present('test'),
        'present',
        { route: { url: 'test' } },
      ))
    })
  })
})
