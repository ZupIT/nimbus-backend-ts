import map from 'lodash/map'
import { Operation } from '../../api'

/**
 * creates an object in Nimbus Script.
 *
 * @param value the object.
 * @returns an instance of Operation<Object>, i.e. an operation that results in an object.
 */
export const object = <T extends { [key: string]: any }>(objectToCreate: T) => {
  const args = map(objectToCreate, (value, key) => [key, value]).flat()
  return new Operation<T>('object', args)
}
