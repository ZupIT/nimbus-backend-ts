import { DynamicExpression, Expression } from '../types'

export type StringOrArray = DynamicExpression<any[]> | Expression<string> | Expression<null> | Expression<undefined>

export type StringArrayOrMap = StringOrArray | DynamicExpression<Record<string, any>>
