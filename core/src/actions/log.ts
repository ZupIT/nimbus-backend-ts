import { createCoreAction } from './core-action'

export interface LogParams {
  /**
   * The path of the property to change. If left blank, the entire structure will be changed.
   */
  message: string,
  /**
   * The new value.
   */
  level: 'Info' | 'Warning' | 'Error',
}

/**
 * Sets a value in the given state. Prefer using the method set of your instance of StateNode instead of this.
 *
 * @param options the parameters for the setState action: id, path and value. See {@link LogParams}.
 * @returns an instance of Action.
 */
export const log = createCoreAction<LogParams>('log')
