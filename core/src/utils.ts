import { hotReloadingString } from './constants'
import { StateNode } from './model/state/state-node'
import { Operation } from './model/operation'
import { InterpolatedText } from './types'

/**
 * Verifies if the value passed as parameter is an instance of StateNode or Operation. i.e. if it's a Nimbus
 * expression.
 *
 * @param data the value to check
 * @returns true if data is an instance of StateNode or Operation. False otherwise.
 */
export const isDynamicExpression = (data: any) => data instanceof StateNode || data instanceof Operation

/**
 * Checks if the program is running in development mode.
 *
 * @returns true if `process.env.NODE_ENV` is unset or `"development"`
 */
export const isDevelopmentMode = () => (process.env.NODE_ENV ?? 'development') === 'development'

/**
 * Enables hot reloading if the environment is development and if the program has started with the environment variable
 * `HOT_RELOADING=true`.
 *
 * This must be called as soon as the server becomes available.
 *
 * @example
 * If you're using express:
 * ```typescript
 * const expressApp = express()
 *
 * expressApp.listen(port, () => {
 *  console.log(`App listening at http://localhost:${port}`)
 *  setupHotReloading()
 * })
 * ```
 */
export function setupHotReloading() {
  if (isDevelopmentMode() && process.env.HOT_RELOADING == 'true') {
    process.stdout.write(
      `${hotReloadingString} if you're seeing this message, the hot reloading service has not started.`,
    )
  }
}

/**
 * Checks if a map contains any value different than null or undefined.
 *
 * @param map the map to look for values.
 * @returns true if the map contains any value, false otherwise.
 */
export const hasAnyValue = (map: Record<string, any>) => Object.values(map).some(v => v !== undefined && v !== null)

const stringable = (value: any) => typeof value !== 'object' || isDynamicExpression(value)
const formatTextUnit = (text: any) => ((text && typeof text === 'object') ? JSON.stringify(text) : text ?? '')
export const childrenToInterpolatedText = (children: InterpolatedText) =>
  (Array.isArray(children) ? children : [children])
    .map(child => stringable(child) ? child : formatTextUnit(child))
    .join('')
