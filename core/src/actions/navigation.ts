import { Expression, HttpMethod } from '../types'
import { Action } from '../model/action'
import { Component } from '../model/component'
import { isDynamicExpression } from '../utils'
import { createCoreAction } from './core-action'

/**
 * Transforms anything into the navigation state expected by the frontend, i.e. an object with `path` and `value`.
 * `path` will be undefined if it's not possible to extract a common path from the argument `data`.
 *
 * Example: `{ user: { address: { position: { lat: 58.8, lng: -136.5 } } } }` becomes
 * `{ path: 'user.address.position', value: { lat: 58.8, lng: -136.5 } }`.
 *
 * @param data the data to transform into a navigation state
 * @returns the navigation state
 */
function formatNavigationState(data: any) {
  if (!data) return
  const keyParts: string[] = []

  while (data && !isDynamicExpression(data) && typeof data === 'object' && Object.keys(data).length === 1) {
    const currentKey = Object.keys(data)[0]
    keyParts.push(currentKey)
    data = data[currentKey]
  }

  return {
    path: keyParts.length ? keyParts.join('.') : undefined,
    value: data,
  }
}

export interface LocalView {
  /**
   * The component tree of this route. The root of this tree tree must have an id.
   */
  screen: Component,
}

export interface HttpAdditionalData {
  /**
   * The HTTP method to use when fetching the screen.
   *
   * @defaultValue `'get'`
   */
  method?: HttpMethod,
  /**
   * The headers to send with the request.
   */
  headers?: Record<string, string>,
  /**
   * The body to send with the request. Invalid for GET requests.
   */
  body?: any,
}

export interface RemoteView {
  /**
   * The URL of the screen to fetch.
   */
  url: Expression<string>,
  /**
   * When set to true, the front-end application will load this as soon as possible instead of waiting the navigation
   * action to be triggered.
   */
  shouldPrefetch?: boolean,
  /**
   * Component tree to show if the screen can't be fetched.
   */
  fallback?: Component,
  /**
   * Further customization for the request.
   */
  httpAdditionalData?: HttpAdditionalData,
}

export type Route = LocalView | RemoteView

export interface BaseNavigationParams {
  /**
   * The navigation state to set in this navigation. Each route (screen) can have a navigation-scoped state and
   * this is the way to set it. For instance, once we click in a "Buy now" button, we may want to send the user to
   * "/product", but "/product" might need to know which product we're talking about, one way to pass this information
   * is via the navigation state.
   *
   * Another use-case for this feature is when we want to return to a page with a new information. For example, when
   * finishing an order, we might need to ask the user for his/her address. After obtaining the address, we can send
   * the user back to the "finish-order" screen (popView) and send the address in the navigation state.
   *
   * By default, nothing is sent here.
   */
  navigationState?: unknown,
}

export interface RouteNavigationParams<T extends (Route | string) = Route> extends BaseNavigationParams {
  /**
   * The route to navigate to. It can be either a remote view, fetched from the backend, or a local view, which is
   * just a new component tree. When it's local, the root of the tree must have an id, this will be used as the name
   * of the route in the local navigator.
   */
  route: T,
}

export type PushParams = RouteNavigationParams
export type PopParams = BaseNavigationParams
export type PopToParams = RouteNavigationParams<string>
export type PresentParams = RouteNavigationParams
export type DismissParams = BaseNavigationParams

const navigator = {
  push: createCoreAction<PushParams>('push'),
  pop: createCoreAction<PopParams>('pop'),
  popTo: createCoreAction<PopToParams>('popTo'),
  present: createCoreAction<PresentParams>('present'),
  dismiss: createCoreAction<DismissParams>('dismiss'),
}

interface PushFunction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
  (url: Expression<string>): Action,

  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param props the parameters for this navigation:
   * - route the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - navigationState: the State for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.push>): ReturnType<typeof navigator.push>,
}

interface PresentFunction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
  (url: Expression<string>): Action,

  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param props the parameters for this navigation:
   * - route the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - navigationState: the State for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.present>): ReturnType<typeof navigator.present>,
}

interface PopToFunction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param url the identifier of the route to go back to. For RemoteViews, this identifier
   * will be the url. For LocalViews, it will the id of the root component.
   * @returns an instance of Action
   */
   (url: Expression<string>): Action,

  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param props the parameters for this navigation:
   * - route: the identifier for the screen to go back to.
   * - navigationState: the State for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.popTo>): ReturnType<typeof navigator.popTo>,
}

interface PopFunction {
  /**
  * Goes back to the previous route.
  *
  * @returns an instance of Action
  * */
  (): Action,

  /**
   * Goes back to the previous route.
   *
   * @param props the parameters for this navigation:
   * - navigationState: the State for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.pop>): ReturnType<typeof navigator.pop>,
}

interface DismissFunction {
  /**
  * Goes back to the previous route.
  *
  * @returns an instance of Action
  * */
  (): Action,

  /**
   * Goes back to the previous route.
   *
   * @param props the parameters for this navigation:
   * - navigationState: the State for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.dismiss>): ReturnType<typeof navigator.dismiss>,
}

function getParams(props: any, isPopToView?: boolean) {
  const isParamASingleUrl = typeof props === 'string' || isDynamicExpression(props)
  if (isParamASingleUrl) return { route: isPopToView ? props : { url: props } }
  if (props?.route?.screen && !props.route.screen.id) {
    throw new Error(`
      The screen component must have an id, to perform a local navigation.
      Root component: "${props?.route?.screen?.namespace ?? 'namespace'}:${props?.route?.screen?.name ?? 'name'}".
    `)
  }
  const { navigationState, ...other } = props
  return { navigationState: formatNavigationState(navigationState), ...other }
}

/** @category Actions */
export const push: PushFunction = (props) => navigator.push(getParams(props))
/** @category Actions */
export const popTo: PopToFunction = (props) => navigator.popTo(getParams(props, true))
/** @category Actions */
export const pop: PopFunction = (props = {}) => navigator.pop(getParams(props))
/** @category Actions */
export const present: PresentFunction = (props) => navigator.present(getParams(props))
/** @category Actions */
export const dismiss: DismissFunction = (props = {}) => navigator.dismiss(getParams(props))
