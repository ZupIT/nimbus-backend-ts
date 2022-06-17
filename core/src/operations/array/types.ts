import { DynamicExpression, Expression } from '../../types'

export type Element<T> = T extends (number | string | boolean) ? Expression<T> : DynamicExpression<T>
