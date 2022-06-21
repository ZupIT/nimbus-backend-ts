export type StructureNodeName = `${string}:${string}`

/**
 * A State declaration as expected by the Nimbus frontend libraries.
 */
export interface StateDeclaration {
  id: string,
  value?: any,
}

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
  state?: StateDeclaration,
  children?: NimbusNode[],
  [key: string]: any,
}
