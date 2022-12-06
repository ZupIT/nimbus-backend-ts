export type StructureNodeName = `${string}:${string}`

/**
 * A call to an Action as expected by the Nimbus frontend libraries.
 */
export interface ActionCall {
  '_:action': StructureNodeName,
  [key: string]: any,
}

/**
 * A component as expected by the Nimbus frontend libraries.
 */
export interface NimbusNode {
  '_:component': StructureNodeName,
  id?: string,
  state?: Record<string, any>,
  children?: NimbusNode[],
  [key: string]: any,
}
