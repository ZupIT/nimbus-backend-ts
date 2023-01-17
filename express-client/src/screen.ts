import { Request, Response } from 'express'
import { Component, State, DeepExpression, Actions } from '@zup-it/nimbus-backend-core'
import { Action } from '@zup-it/nimbus-backend-core/api'
import { Navigator } from './navigator'
import { NimbusHeaders, IsRequired } from './utils/types'

export interface RequestWithCustomHeaders<RouteParams = any, Headers = any, Data = any, Query = any>
  extends Request<RouteParams, any, Data, Query> {
  /**
   * The request headers of the request.
   */
  headers: Request['headers'] & Headers & NimbusHeaders,
}

/**
 * The types expected in this Screen's request.
 */
export interface ScreenRequest {
  /**
   * The request headers expected to be in the request.
   *
   * Example: if you expect a header called "session-token", this should be:
   * ```typescript
   * { 'session-token': string }
   * ```
   */
  headers?: Record<string, string>,
  /**
   * The parameters expected in the route.
   *
   * Example: if the route is "/user/:userId/books/:bookId", this should be:
   * ```typescript
   * {
   *   userId: string,
   *   bookId: string,
   * }
   * ```
   */
  routeParams?: Record<string, string>,
  /**
   * The query parameters expected in the route.
   *
   * Example: if the route is "/list?order=crescent&page=1&limit=10", this should be:
   * ```typescript
   * {
   *   order: 'crescent' | 'decrescent',
   *   page: `${number}`,
   *   limit: `${number}`,
   * }
   * ```
   */
  query?: Record<string, string>,
  /**
   * The type of the request data. If a JSON is expected, specify here the object interface.
   */
  data?: unknown,
  /**
   * The view states of this screen, passed when navigating.
   */
  state?: Record<string, any>,
  /**
   * The events this screen can trigger and the value types they produce.
   */
  events?: Record<string, any>,
}

interface ScreenProps<T extends ScreenRequest> {
  /**
   * Recovers a view state. A view state is normally passed when navigating to a screen.
   * @param event the name of the state to get
   */
  getViewState: <Key extends keyof T['state']>(name: Key) => State<T['state'][Key]>,
  /**
   * Triggers a view event.
   * @param event the event name
   * @param value the value to pass to the event
   */
  triggerViewEvent: <Key extends keyof T['events']>(event: Key, value: DeepExpression<T['events'][Key]>) => Action,
  /**
   * The request object from express.
   */
  request: RequestWithCustomHeaders<T['routeParams'], T['headers'], T['data'], T['query']>,
  /**
   * The response object from express.
   */
  response: Response,
  /**
   * The navigator makes it easier and safer to use navigation actions for remote routes. Its use is optional and, in
   * terms of functionality, is equivalent to the navigation actions of the core library.
   *
   * It is better to use the navigator because, instead of working with strings, that can be anything, it works with
   * the functional components directly and verifies if the route actually exists. If it doesn't, an error is thrown.
   * Moreover, it separates the string "url" into "routeParams" and "query", while also typing every property according to
   * the screen.
   *
   * Example: suppose a screen called `Order` that can receive:
   * 1. the order id through a route parameter;
   * 2. whether to show the complete order or just a summary via a query parameter;
   * 3. and a token via headers.
   *
   * Considering we typed it correctly using the type `Screen`, a navigation to it could be written like this:
   * ```typescript
   * // using the navigator
   * navigator.push(Order, {
   *   routeParams: { orderId: '1' },
   *   query: { summary: 'true' },
   *   headers: { token: '_AEx45O' },
   * })
   *
   * // using push from the core actions
   * push({
   *   route: {
   *     url: '/order/1?summary=true',
   *     httpAdditionalData: {
   *       headers: { token: '_AEx45O' },
   *     },
   *   }
   * )
   * ```
   *
   * Using the navigator, we're going to have validation in single one of the fields, making sure the correct type of
   * data is passed and providing auto-completion. Besides, we don't need to know the url for "Order", we just use the
   * imported Screen itself.
   *
   * The second way of navigating works, but it allows a long list of mistakes.
   */
  navigator: Navigator,
}

/**
 * A functional component that will be registered as a screen. Its props will be injected by the NimbusApplication
 * and contain the request, response, navigation state and navigator.
 *
 * It is extremely important to type `T` in `Screen<T>`. `T` tells Typescript what to expect from this screen when
 * building it and when navigating to it, i.e. it tells the type of the headers, query, route parameters, data and
 * navigation state.
 */
export type Screen<T extends ScreenRequest = ScreenRequest> = (props: ScreenProps<T>) => JSX.Element

interface BaseScreenNavigation {
  /**
   * When set to true, this screen will be fetched by the frontend as soon as possible instead of waiting any event to
   * trigger. This makes the navigation faster because when it actually happens, the page will already have been loaded.
   * Use it carefully though, making useless requests is not good. You should use this when the user will most certainly
   * access this screen next.
   */
  prefetch?: boolean,
  /**
   * An UI to show if the request fails.
   */
  fallback?: Component,
}

interface WithRouteParams<T> {
  /**
   * The parameters for the url.
   *
   * Example: if the route is "/user/:userId/books/:bookId", this could be `{ userId: '1', bookId: '302' }`.
   */
  routeParams: T,
}

interface WithState<T extends Record<string, any> | undefined> {
  /**
   * The map of states that will be created on the next screen.
   */
  state: {
    [key in keyof T]: DeepExpression<T[key]>
  },
}

interface WithEvents<T extends Record<string, any> | undefined> {
  /**
   * The actions to associate with the events the next screen can trigger.
   */
  events?: {
    [K in keyof T]?: (value: State<T[K]>) => Actions
  },
}

interface WithHeaders<T> {
  /**
   * The headers to send in the request.
   */
  headers: T,
}

interface WithData<T> {
  /**
   * The request data. Invalid for "GET" requests.
   */
  data: T,
}

interface WithQuery<T> {
  /**
   * The properties in the url's query.
   *
   * Example: if you want the url to be "/list?page=1&limit=10", this should be `{ page: '1', limit: '10' }`.
   */
  query: T,
}

/**
 * Type of the navigation parameters in the Navigator.
 */
export type ScreenNavigation<T extends ScreenRequest> = BaseScreenNavigation
  & (IsRequired<T, 'routeParams'> extends true
    ? WithRouteParams<T['routeParams']> : Partial<WithRouteParams<T['routeParams']>>)
  & (IsRequired<T, 'headers'> extends true ? WithHeaders<T['headers']> : Partial<WithHeaders<T['headers']>>)
  & (IsRequired<T, 'data'> extends true ? WithData<T['data']> : Partial<WithData<T['data']>>)
  & (IsRequired<T, 'query'> extends true ? WithQuery<T['query']> : Partial<WithQuery<T['query']>>)
  & WithEvents<T['events']>
  & (IsRequired<T, 'state'> extends true
    ? WithState<T['state']>
    : Partial<WithState<T['state']>>)

