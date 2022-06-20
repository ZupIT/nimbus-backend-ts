import { FC } from '@zup-it/nimbus-backend-core'
import { push, popTo, pop, present, dismiss, Route } from '@zup-it/nimbus-backend-core/actions'
import { forEach, isEmpty, map } from 'lodash'
import { ControllerId, PopToAction, PopAction, PushAction, PresentAction, DismissAction } from './model/navigation'
import { RouteMap, RouteConfig } from './route'
import { ScreenNavigation } from './screen'

const navigationActions = { push, popTo, pop, present, dismiss }

interface GenericRemoteNavigationProperties extends ScreenNavigation<any>, Partial<ControllerId> {}

interface GenericRemoteNavigation {
  type: keyof typeof navigationActions,
  screen?: FC<any>,
  properties?: GenericRemoteNavigationProperties,
}

/**
 * See the property `navigation` in the interface `ScreenProps` for a detailed description of the Navigator.
 *
 * The instance of the current navigator is injected by the NimbusApplication for every registered Screen.
 *
 * @example
 * ```tsx
 * const MyScreen: Screen<Type> = ({ navigator }) => {
 *   // ...
 * }
 * ```
 */
export class Navigator {
  /**
   * @param routeMap the same routeMap received by NimbusApplication.
   * @param basePath the same basePath received by NimbusApplication options.
   */
  constructor(routeMap: RouteMap) {
    this.screenMap = new Map()
    forEach(routeMap, (value, key) => this.screenMap.set(
      typeof value === 'function' ? value : value.screen,
      { path: key, method: typeof value === 'function' ? undefined : value.method },
    ))
  }

  private screenMap: Map<FC<any>, RouteConfig>

  private getPathAndMethod(screen: FC<any>) {
    if (!this.screenMap.has(screen)) {
      throw new Error(
        "Couldn't find any route corresponding to the provided screen. Are you sure you registered it in the route map provided to the NimbusApp?",
      )
    }
    return this.screenMap.get(screen)!
  }

  private buildUrl(path: string, routeParams: Record<string, string> = {}, query?: Record<string, string>) {
    const withRouteParams = path.replace(
      /:(\w+)/g,
      (_, name) => name in routeParams ? encodeURIComponent(routeParams[name]) : `:${name}`,
    )
    const queryParts = map(query, (value, key) => `${key}=${encodeURIComponent(value)}`)
    return isEmpty(queryParts) ? withRouteParams : `${withRouteParams}?${queryParts.join('&')}`
  }

  private buildRoute({ type, screen, properties = {} }: GenericRemoteNavigation) {
    if (type === 'pop' || type === 'dismiss') return undefined

    const { routeParams, headers, body, shouldPrefetch, fallback, query } = properties
    const { path, method } = this.getPathAndMethod(screen!)
    const url = this.buildUrl(path, routeParams, query)
    if (type === 'popTo') return url

    const httpAdditionalData = method || headers || body ? { method, headers, body } : undefined

    return {
      url,
      httpAdditionalData,
      shouldPrefetch,
      fallback,
    } as Route
  }

  private navigateRemote(navigation: GenericRemoteNavigation) {
    return navigationActions[navigation.type]({
      // @ts-ignore todo: check this later
      route: this.buildRoute(navigation),
      navigationState: navigation.properties?.navigationState,
      controllerId: navigation.properties?.controllerId,
    })
  }

  push: PushAction = (...[screen, properties]) => this.navigateRemote({ type: 'push', screen, properties })

  pop: PopAction = (properties) => this.navigateRemote({ type: 'pop', properties })

  popTo: PopToAction = (...[screen, properties]) => this.navigateRemote({ type: 'popTo', screen, properties })

  present: PresentAction = (...[screen, properties]) => this.navigateRemote({ type: 'present', screen, properties })

  dismiss: DismissAction = (properties) => this.navigateRemote({ type: 'dismiss', properties })
}
