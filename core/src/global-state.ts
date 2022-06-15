import { createStateNode } from './model/state/state-node'

/**
 * The Global State is a Nimbus State that doesn't need to be declared and is available for the entire lifetime of
 * the application, i.e. if you set the a value in teh global state in Screen A, the value will be available in Screen
 * B. Furthermore, the values in the global state can also be set by the frontend application.
 *
 * We advise the developer to define the structure of the global state as an interface, so it can be safely accessed.
 * When retrieving the global state, use `getGlobalState<T>()`, where T is the interface.
 *
 * @returns a reference to the Global State.
 */
export const getGlobalState = <T>() => createStateNode<T>('global')
