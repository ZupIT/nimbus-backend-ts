import { Actions } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '..'
import { ScreenNavigation } from '../screen'
import { HasRequiredProperty } from '../utils/types'

export interface ControllerId {
  controllerId?: string,
}

type Push<T extends ScreenRequest> = ScreenNavigation<T>
type Present<T extends ScreenRequest> = ScreenNavigation<T>
type Pop<T extends ScreenRequest> = Pick<ScreenNavigation<T>, 'navigationState'>
type Dismiss<T extends ScreenRequest> = Pick<ScreenNavigation<T>, 'navigationState'>
type PopTo<T extends ScreenRequest> = Pick<ScreenNavigation<T>, 'navigationState' | 'routeParams' | 'query'>

type NavigationAction<T extends ScreenRequest, N> = HasRequiredProperty<T> extends true
  ? [screen: Screen<T>, properties: N] : [screen: Screen<T>, properties?: N]

export interface PushAction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, Push<T>>): Actions,
}

export interface PresentAction {
  /**
   * Present a modal with the required screen
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, Present<T>>): Actions,
}

export interface PopAction {
  /**
   * Goes back to the previous route.
   *
   * @param properties the navigation state to set.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(properties?: Pop<T>): Actions,
}

export interface DismissAction {
  /**
   * Dismiss the modal that is open
   *
   * @param properties the navigation state to set.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(properties?: Dismiss<T>): Actions,
}

export interface PopToAction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param screen the screen (functional component) to go back to.
   * @param properties the data to send with this navigation.
   * @returns an instance of Action.
   */
  <T extends ScreenRequest>(...args: NavigationAction<T, PopTo<T>>): Actions,
}
