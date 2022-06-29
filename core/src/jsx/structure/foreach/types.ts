import { WithState, Expression, Component, State } from '../../../api'

export interface ForEachProps<T> extends WithState {
  items: Expression<T[]>,
  key?: string,
  children: (item: State<T>) => Component,
}
