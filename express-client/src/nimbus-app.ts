import { forEach } from 'lodash'
import { Express } from 'express'
import { serialize, createStateNode, HttpMethod } from '@zup-it/nimbus-backend-core'
import { RouteConfig, RouteMap } from './route'
import { RequestWithCustomHeaders, Screen } from './screen'
import { Navigator } from './navigator'

interface Options {
  /**
   * The headers to include in every response.
   */
  responseHeaders?: Record<string, string>,
  /**
   * The path to be used as a prefix for every route.
   */
  basePath?: string,
  /**
   * The path to be used as a prefix when navigating to a server driven view. By default, it will be the same as
   * `basePath`.
   */
  navigatorBasePath?: string,
}

/**
 * A Nimbus application is a set of routes registered to the express instance provided in the constructor.
 *
 * Each route provided in the constructor will be registered into express so, when it's requested, the related screen
 * (functional component) is called with an object containing:
 *
 * - request: the current express request object;
 * - response: the current express response object;
 * - navigationState: the Nimbus's navigationState for this screen;
 * - navigator: a Navigator, i.e. a strictly typed structure that makes it easier and safer to use navigation actions.
 */
export class NimbusApp {
  /**
   * @param express the instance of express to register the routes to.
   * @param routes the route map, i.e. a map where the keys are the route names (strings) and the values are any of the
   * following:
   * 1. The functional component to render, i.e. a function that returns a JSX element.
   * 2. An object containing the properties `method`, which is the http method to use for the route; and `screen`, which
   * is the functional component to render.
   *
   * Note that the route name is gonna be combined with the basePath and be directly passed to express, i.e. everything
   * accepted by express in the route name is accepted here.
   * @param options the response headers common to every request and the basePath.
   */
  constructor(private express: Express, routes: RouteMap, options: Options = {}) {
    this.responseHeaders = options.responseHeaders ?? {}
    this.basePath = options.basePath ?? ''
    this.addRouteMap(routes)
    this.navigator = new Navigator(routes, options.navigatorBasePath ?? options.basePath)
  }

  private responseHeaders: Record<string, any>
  private basePath: string
  private navigationState = createStateNode('navigationState')
  private navigator: Navigator

  private expressMethodParser = (method?: HttpMethod | undefined): 'get' | 'patch' | 'put' | 'post' | 'delete' => {
    switch (method) {
      case 'Get': return 'get'
      case 'Patch': return 'patch'
      case 'Put': return 'put'
      case 'Post': return 'post'
      case 'Delete': return 'delete'
      default: return 'get'
    }
  }

  private addRoute = (screen: Screen, properties: RouteConfig) => {
    const { method, path } = properties
    this.express[this.expressMethodParser(method)](`${this.basePath}${path}`, (req, res) => {
      res.type('application/json')
      forEach(this.responseHeaders, (value, key) => res.setHeader(key, value))
      const componentTree = screen({
        request: req as RequestWithCustomHeaders,
        response: res,
        navigationState: this.navigationState,
        navigator: this.navigator,
      })
      res.send(serialize(componentTree))
    })
  }

  private addRouteMap(routeMap: RouteMap) {
    forEach(routeMap, (value, key) => {
      if (typeof value === 'function') this.addRoute(value, { path: key })
      else this.addRoute(value.screen, { path: key, method: value.method })
    })
  }
}
