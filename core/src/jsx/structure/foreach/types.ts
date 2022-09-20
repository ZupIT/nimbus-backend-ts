import { Expression, State, WithState } from '../../../api'

export interface ForEachProps<T> extends WithState {
  items?: Expression<T[]>,
  /**
   * @default 'item'
   */
  iteratorName?: string,
  /**
   * @default 'index'
   */
  indexName?: string,
  key?: keyof T,
  children: (item: State<T>, index: State<number>) => JSX.Element,
}
