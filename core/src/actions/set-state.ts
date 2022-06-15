import { createCoreAction } from './core-action'

export interface SetStateParams<T = any> {
  /**
   * The path of the property to change. If left blank, the entire structure will be changed.
   */
  path: string,
  /**
   * The new value.
   */
  value: T,
}

/**
 * Sets a value in the given state. Prefer using the method set of your instance of StateNode instead of this.
 *
 * @param options the parameters for the setState action: id, path and value. See {@link SetStateParams}.
 * @returns an instance of Action.
 */
export const setState = createCoreAction<SetStateParams>('setState')
