import { Actions } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '..'
import { ScreenNavigation } from '../screen'
import { HasRequiredProperty } from '../utils/types'

export interface ControllerId {
  controllerId?: string,
}

type PushStack<T extends ScreenRequest> = ScreenNavigation<T> & ControllerId
type PushView<T extends ScreenRequest> = ScreenNavigation<T>
type PopView<T extends ScreenRequest> = Pick<ScreenNavigation<T>, 'navigationState'>
type PopStack<T extends ScreenRequest> = Pick<ScreenNavigation<T>, 'navigationState'>
type PopToView<T extends ScreenRequest> = Pick<
  ScreenNavigation<T>, 'navigationState' | 'routeParams' | 'query'
>
type ResetStack<T extends ScreenRequest> = ScreenNavigation<T> & ControllerId
type ResetApplication<T extends ScreenRequest> = ScreenNavigation<T> & ControllerId

type NavigationAction<T extends ScreenRequest, N> = HasRequiredProperty<T> extends true
  ? [screen: Screen<T>, properties: N] : [screen: Screen<T>, properties?: N]

export interface PushStackAction {
  /**
   * Adds a new stack to the navigator with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, PushStack<T>>): Actions,
}

export interface PushViewAction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, PushView<T>>): Actions,
}

export interface PopViewAction {
  /**
   * Goes back to the previous route.
   *
   * @param properties the navigation state to set.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(properties?: PopView<T>): Actions,
}

export interface PopStackAction {
  /**
   * Pops the current stack, going back to the last route of the previous stack.
   *
   * @param properties the navigation state to set.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(properties?: PopStack<T>): Actions,
}

export interface PopToViewAction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param screen the screen (functional component) to go back to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, PopToView<T>>): Actions,
}

export interface ResetStackAction {
  /**
   * Removes the current navigation stack and adds a new one with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, ResetStack<T>>): Actions,
}

export interface ResetApplicationAction {
  /**
   * Removes all the navigation stacks and adds a new one with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, ResetApplication<T>>): Actions,
}
