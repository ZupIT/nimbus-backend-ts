/**
 * Utility type to include the properties that should be included in every action.
*/
export type ActionProps<Props> = Props

/**
 * An Action factory.
 */
export type ActionFunction<Props> = (props: ActionProps<Props>) => Action

export type Actions = Action | Action[]

/**
 * An Action is a behavior to be triggered in the front-end application. Actions are always associated with events. For
 * instance, considering the library of default components, the Button has the onPress event and the Container has the
 * onInit event. Events can also be found in other actions, e.g. the sendRequest has the events onSuccess, onError and
 * onFinish.
 *
 * Both Actions and Operations end up as functions in the front-end, but their concept are very different! Operations
 * always have a return value, they transform their arguments in something else, so this something else can be used
 * instead. Operation functions never have colateral effects and are generally very simple. Action functions never have
 * a return value and they can have as many colateral effects as they want. They can also be very complex, the
 * sendRequest action, for instance, is a function that interacts with the network layer of the application.
 *
 * Some actions shipped with Nimbus are: sendRequest, setState and push.
 *
 * @example
 * ```tsx
 * <Button
 *   onPress={new Action({
 *     name: 'alert',
 *     namespace: 'nimbus',
 *     properties: { message: 'Hello World!' },
 *   })}
 * >
 *   Click me!
 * </Button>
 * ```
 *
 * This is not very nice and the type checking is quite bad. Instead of instantiating the action from within the
 * JSX, we create strictly typed functions that instantiate the actions for us. Check the example below:
 *
 * ```typescript
 * export const alert = (message: string) => new Action({ name: 'alert', namespace: 'nimbus', properties: { message } })
 * ```
 *
 * Then, in our JSX code, we write:
 * ```tsx
 * <Button onPress={alert('Hello World!')}>Click me!</Button>
 * ```
 *
 * This is a very simple example and it omits many of the properties of an Alert action. To create an action factory
 * with all properties of an Action, check the helper method {@link createAction}.
 */
export interface Action<Props = any> {
  /**
   * The namespace for this action. Actions in nimbus are identified by a string in the format "$namespace:$name", e.g
   * "nimbus:alert".
   */
  namespace?: string,
  /**
   * The name for this action. Actions in nimbus are identified by a string in the format "$namespace:$name", e.g
   * "nimbus:alert".
   */
  name: string,
  /**
   * The properties for this action,
   */
  properties?: Props,
  /**
   * Don't use this. This property is here just to avoid the assignment of functions to this type.
   */
   call?: never,
}
export class Action<Props = any> {
  private static ACTION_TYPE = 'action'

  /**
   * @param options the action parameters: namespace, name, properties. See {@link Action}.
   */
  constructor({ name, namespace, properties }: Action<Props>) {
    this.name = name
    this.namespace = namespace
    this.properties = properties
    // @ts-ignore
    this._type = Action.ACTION_TYPE // avoiding strange random behavior where instanceof doesn't work
  }

  static isAction(value: any | undefined | null) {
    return value instanceof Action || value?._type === Action.ACTION_TYPE
  }
}

/**
 * Creates an {@link Action} Factory based on the properties passed in the generic. See the example below:
 * ```typescript
 * interface MyAlert {
 *   title?: Expression<string>,
 *   message: Expression<string>,
 *   icon?: string,
 * }
 *
 * export const myAlert = createAction<MyAlert>('my-alert', 'custom')
 * ```
 *
 * This creates a correctly typed Action factory that generates Action instances for the custom action "my-alert". To
 * use it in your screen, just call `myAlert`:
 *
 * ```tsx
 * <Button onPress={myAlert({ title: 'Hi!', message: 'Welcome to my app!', icon: 'happy-face'})}>Click me!</Button>
 * ```
 *
 * @param name the name for this action. Actions in nimbus are identified by a string in the format "$namespace:$name",
 * e.g "nimbus:alert".
 * @param namespace the namespace for this action.
 * @returns an Action Factory
 */
export const createAction = <Props = any>(name: string, namespace?: string): ActionFunction<Props> => (
  { ...properties },
) => new Action<Props>({ name, namespace, properties: properties as Props })
