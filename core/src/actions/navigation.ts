import mapValues from 'lodash/mapValues'
import { createStateNode, State } from '../api'
import { Expression, HttpMethod } from '../types'
import { Action, ActionProps, Actions } from '../model/action'
import { Component } from '../model/component'
import { isDynamicExpression } from '../utils'
import { createCoreAction } from './core-action'

interface BasePushProperties {
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
  /**
   * The state attached to the next screen. Used for passing values from this screen to the next.
   *
   * Attention: these are NEW states that will be initialized in the next screen with the specified values. They're
   * not the same states of this screen, i.e. the states of this view are not shared with the next.
   */
  state?: Record<string, any>,
}

export interface PushProperties<EventTypes extends { [key: string]: any } = Record<string, unknown>>
extends BasePushProperties {
  /**
   * The actions to run when the specified event is triggered in the next screen.
   *
   * While `state` is used for communicating values from this screen to the next, `events` are used to communicate
   * values from the next screen to this screen.
   *
   * Example: if this screen lists a series of todo notes and the next is responsible for displaying a form to edit a
   * note, the next screen can trigger `onSaveNote` with the edited value and this event will be treated here:
   *
   * ```
   * events: {
   *   onSaveNote: (value) => [log(value)]
   * }
   * ```
   *
   * Above, `value` contains a state where the value is the edited note.
   */
  events?: { [k in keyof EventTypes]: (value: State<EventTypes[k]>) => Actions },
}

interface RawPushProperties {
  events?: Actions,
}

export interface PopToProperties {
  url: string,
}

export type Route = PushProperties | PopToProperties

const navigator = {
  push: createCoreAction<RawPushProperties>('push'),
  pop: createCoreAction<void>('pop'),
  popTo: createCoreAction<PopToProperties>('popTo'),
  present: createCoreAction<RawPushProperties>('present'),
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
   * @returns an instance of Action
   */
  <EventTypes extends { [key: string]: any } = Record<string, unknown>>
  (properties: ActionProps<PushProperties<EventTypes>>): ReturnType<typeof navigator.push>,
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
   * @returns an instance of Action
   */
  <EventTypes extends { [key: string]: any } = Record<string, unknown>>
  (properties: ActionProps<PushProperties<EventTypes>>): ReturnType<typeof navigator.present>,
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
  if (props.events) {
    return {
      ...props,
      events: mapValues(props.events, (eventFunction, eventName) => eventFunction(createStateNode(eventName))),
    }
  }
  return props
}

/** @category Actions */
export const push: PushFunction = (props: unknown) => navigator.push(getParams(props))
/** @category Actions */
export const popTo: PopToFunction = (props) => navigator.popTo(getParams(props, true))
/** @category Actions */
export const pop: PopFunction = (props = {}) => navigator.pop(getParams(props))
/** @category Actions */
export const present: PresentFunction = (props: unknown) => navigator.present(getParams(props))
/** @category Actions */
export const dismiss: DismissFunction = (props = {}) => navigator.dismiss(getParams(props))
