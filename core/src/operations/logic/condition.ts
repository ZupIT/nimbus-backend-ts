import { Operation } from '../../api'
import { ValidOperationAttribute } from '../../model/operation/types'
import { Expression } from '../../types'

/**
 * If the first parameter resolves to true, the second parameter is returned. Otherwise, the third parameter is
 * returned.
 *
 * @param premise the condition to verify
 * @param ifTrue the value to return if the premise resolves to true
 * @param otherwise the value to return if the premise resolves to false
 * @returns an instance of Operation<typeof ifTrue | typeof otherwise>, i.e. an operation that results in ifTrue or
 * ifFalse when run by the frontend.
 */
export const condition = <WhenTrue extends ValidOperationAttribute, WhenFalse extends ValidOperationAttribute>(
  premise: Expression<boolean>,
  ifTrue: WhenTrue,
  otherwise: WhenFalse,
) => new Operation<WhenTrue | WhenFalse>('condition', [premise, ifTrue, otherwise])
