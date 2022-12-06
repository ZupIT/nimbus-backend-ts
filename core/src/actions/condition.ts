import { Actions, Expression } from '../api'
import { createCoreAction } from './core-action'

export interface ConditionalActionParams {
  /**
   * The condition
   */
  condition: Expression<boolean>,
  /**
   * The actions to run when the condition is true
   */
  onTrue?: Actions,
  /**
   * The actions to run when the condition is false
   */
   onFalse?: Actions,
}

/**
 * Runs a set of actions depending on a condition.
 *
 * @param options the parameters for the conditional action: condition, onTrue, onFalse. See
 * {@link ConditionalActionParams}.
 * @returns an instance of Action.
 */
export const conditionalAction = createCoreAction<ConditionalActionParams>('condition')
