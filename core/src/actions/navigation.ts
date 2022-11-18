import { Expression, HttpMethod } from '../types'
import { Action } from '../model/action'
import { Component } from '../model/component'
import { isDynamicExpression } from '../utils'
import { createCoreAction } from './core-action'

export interface PushProperties {
  /**
   * The URL of the screen to fetch.
   */
  url: Expression<string>,
  /**
   * When set to true, the front-end application will load this as soon as possible instead of waiting the navigation
   * action to be triggered.
   */
  prefetch?: boolean,
  /**
   * Component tree to show if the screen can't be fetched.
   */
  fallback?: Component,
  /**
   * The HTTP method to use when fetching the screen.
   *
   * @default 'Get'
   */
   method?: HttpMethod,
   /**
    * The headers to send with the request.
    */
   headers?: Record<string, string>,
   /**
    * The data to send with the request. Invalid for GET requests.
    */
   data?: any,

   params?: Record<string, any>,
}

export interface PopToProperties {
  url: string,
}

export type Route = PushProperties | PopToProperties

const navigator = {
  push: createCoreAction<PushProperties>('push'),
  pop: createCoreAction<void>('pop'),
  popTo: createCoreAction<PopToProperties>('popTo'),
  present: createCoreAction<PushProperties>('present'),
  dismiss: createCoreAction<void>('dismiss'),
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
   * - route the screen to load.
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
   * - route the screen to load.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.present>): ReturnType<typeof navigator.present>,
}

interface PopToFunction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param url the identifier of the route to go back to.
   * @returns an instance of Action
   */
   (url: Expression<string>): Action,

  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param props the parameters for this navigation:
   * - route: the identifier for the screen to go back to.
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
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.dismiss>): ReturnType<typeof navigator.dismiss>,
}

function getParams(props: any, isPopToView?: boolean) {
  const isParamASingleUrl = typeof props === 'string' || isDynamicExpression(props)
  if (isParamASingleUrl) {
    return {
      route: isPopToView ? props : { url: props },
    }
  }
  return props
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
