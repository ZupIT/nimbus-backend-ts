import { LocalState } from './state/types'

export interface WithState {
  /**
   * A State that will be made available for this Component and its children.
   *
   * This must be a RootState, created via the function `createState`. States like the global state, the
   * navigation states or implicit states don't need to be declared and won't be accepted here.
   */
  state?: LocalState<any> | LocalState<any>[],
}

export interface WithChildren {
  /**
   * The children of this Component. This must be a single Component or an array of Components.
   */
  children?: Component | Component[] | null,
}

export interface WithAccessibility {
  accessibility?: {
    label?: string,
    isHeader?: boolean,
  },
}

/**
 * The Component is Nimbus's main structure. It is a node in the UI tree the backend returns to the frontend.
 *
 * The Components are the basic structure we use to build a view and we use JSX to declare them, i.e. this class should
 * never be used by the developer to instantiate a new component.
 *
 * To define a new component, use the single intrinsic element: `<component />`:
 *
 * ```tsx
 * interface MyCustomTextProps {
 *   children: string,
 *   fontFamily: string,
 *   color: string,
 *   size: string,
 * }
 *
 * export const MyCustomText: FC<MyCustomTextProps> = ({ children, id, ...other }) => (
 *   <component name="my-custom-text" namespace="custom" id={id} properties={{ ...other, text: children }} />
 * )
 * ```
 */
export interface Component extends WithState, WithChildren {
  /**
   * An optional id for this component.
   * This is important for debugging or for identifying it in structures like the Action addChildren.
  */
  id?: string,
  /**
   * All the properties for this Component.
   */
  properties?: Record<string, any>,
  /**
   * The name of the Component. Every Component type is identified in the front-end by a string in the format
   * "$namespace:$name". The Container, for instance is a "nimbus:container".
   */
  name: string,
  /**
   * The namespace of the Component. Every Component type is identified in the front-end by a string in the format
   * "$namespace:$name". The Container, for instance is a "nimbus:container".
   */
  namespace?: string,
  /**
   * Don't use this. This property is here just to avoid the assignment of functions to this type.
   */
  call?: never,
}

export class Component {
  /**
   * @param options the component parameters: properties, children, state, id, name and namespace.
   */
  constructor({ id, namespace, name, state, properties, children }: Component) {
    this.id = id
    this.namespace = namespace
    this.name = name
    this.state = state
    this.properties = properties
    this.children = children
  }
}
