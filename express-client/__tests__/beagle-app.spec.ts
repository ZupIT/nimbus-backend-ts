import { Component, serialize } from '@zup-it/nimbus-backend-core'
import { Express, RequestParamHandler, Request, Response } from 'express'
import { NimbusApp, RouteMap } from 'src'

// mocks the navigator
jest.mock('src/navigator', () => ({
  __esModule: true,
  Navigator: class {
    constructor(routes: RouteMap) {
      this.routes = routes
    }

    routes: RouteMap
  },
}))

const createMockedExpress = () => ({
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
} as unknown as Express)

const createMockedRequest = () => ({ url: 'test' } as unknown as Request)

const createMockedResponse = () => ({
  type: jest.fn(),
  setHeader: jest.fn(),
  send: jest.fn(),
} as unknown as Response)

describe('Nimbus App', () => {
  const component = new Component({ name: 'test' })
  const testScreen = jest.fn(() => component)

  it('should add functional routes', () => {
    const express = createMockedExpress()
    new NimbusApp(express, {
      'route1': testScreen,
      'route2': testScreen,
    })
    expect(express.get).toHaveBeenCalledTimes(2)
    expect(express.get).toHaveBeenNthCalledWith(1, 'route1', expect.any(Function))
    expect(express.get).toHaveBeenNthCalledWith(2, 'route2', expect.any(Function))
  })

  it('should add mapped routes', () => {
    const express = createMockedExpress()
    new NimbusApp(express, {
      'defaultRoute': { screen: testScreen },
      'getRoute': { method: 'Get', screen: testScreen },
      'putRoute': { method: 'Put', screen: testScreen },
      'postRoute': { method: 'Post', screen: testScreen },
      'deleteRoute': { method: 'Delete', screen: testScreen },
      'patchRoute': { method: 'Patch', screen: testScreen },
    })
    expect(express.get).toHaveBeenCalledTimes(2)
    expect(express.get).toHaveBeenNthCalledWith(1, 'defaultRoute', expect.any(Function))
    expect(express.get).toHaveBeenNthCalledWith(2, 'getRoute', expect.any(Function))
    expect(express.put).toHaveBeenCalledTimes(1)
    expect(express.put).toHaveBeenNthCalledWith(1, 'putRoute', expect.any(Function))
    expect(express.post).toHaveBeenCalledTimes(1)
    expect(express.post).toHaveBeenNthCalledWith(1, 'postRoute', expect.any(Function))
    expect(express.delete).toHaveBeenCalledTimes(1)
    expect(express.delete).toHaveBeenNthCalledWith(1, 'deleteRoute', expect.any(Function))
    expect(express.patch).toHaveBeenCalledTimes(1)
    expect(express.patch).toHaveBeenNthCalledWith(1, 'patchRoute', expect.any(Function))
  })

  it('should use basePath to setup routes', () => {
    const express = createMockedExpress()
    new NimbusApp(
      express,
      {
        'route1': testScreen,
        'route2': { method: 'Put', screen: testScreen },
      },
      { basePath: 'nimbus/' },
    )
    expect(express.get).toHaveBeenCalledWith('nimbus/route1', expect.any(Function))
    expect(express.put).toHaveBeenCalledWith('nimbus/route2', expect.any(Function))
  })

  describe('When a request is made to a screen', () => {
    const express = createMockedExpress()
    const request = createMockedRequest()
    const response = createMockedResponse()
    const routes: RouteMap = { 'route': testScreen }
    new NimbusApp(express, routes, { responseHeaders: { platform: 'test', hello: 'world' } })
    const handler: RequestParamHandler = (express.get as jest.Mock).mock.calls[0][1]
    handler(request, response, jest.fn(), null, '')

    it('should add response headers', () => {
      expect(response.setHeader).toHaveBeenCalledTimes(2)
      expect(response.setHeader).toHaveBeenNthCalledWith(1, 'platform', 'test')
      expect(response.setHeader).toHaveBeenNthCalledWith(2, 'hello', 'world')
    })

    it('should set type', () => {
      expect(response.type).toHaveBeenCalledTimes(1)
      expect(response.type).toHaveBeenCalledWith('application/json')
    })

    it('should call the screen function with the request, response and navigator', () => {
      expect(testScreen).toHaveBeenCalledTimes(1)
      expect(testScreen).toHaveBeenCalledWith({
        request,
        response,
        navigator: { routes },
        getViewState: expect.any(Function),
        triggerViewEvent: expect.any(Function),
      })
    })

    it('should serialize the resulting component and set it as the response body', () => {
      const serialized = serialize(component)
      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(serialized)
    })
  })
})
