import { Operation } from '../../api'

/**
 * creates an array in Nimbus Script.
 *
 * @param value the array.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an array.
 */
export const array = <T extends any[]>(...arrayToCreate: T) => new Operation<T>('array', arrayToCreate)
