import { createCoreAction } from './core-action'

export interface TriggerViewEventParams {
  /**
   * Name of the event to trigger.
   */
  event: string,
  /**
   * The value for the event.
   */
  value: any,
}

export const triggerViewEvent = createCoreAction<TriggerViewEventParams>('triggerViewEvent')
