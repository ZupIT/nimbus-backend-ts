import { createCoreAction } from './core-action'

export interface LogParams {
  /**
   * The object to log. Can be anything, but null.
   */
  message: any,
  /**
   * The type of message.
   */
  level?: 'Info' | 'Warning' | 'Error',
}

/**
 * Logs a message using the Nimbus Logger configured in the application.
 *
 * @param options the parameters for the log action: message, level. See {@link LogParams}.
 * @returns an instance of Action.
 */
export const log = createCoreAction<LogParams>('log')
