import { Expression, State } from '../../../api'

export interface ForEachProps<T> {
  items?: Expression<T[]>,
  /**
   * @default item
   */
  iteratorName?: string,
  /**
   * @default index
   */
  indexName?: string,
  key?: string,
  children: (item: State<T>, index: State<number>) => JSX.Element,
}
