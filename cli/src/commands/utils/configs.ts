import { cwd } from 'process'
import fsPromise from 'fs/promises'
import { NimbusTsConfig } from '../types'

export const getProjectConfigsFile = async () =>
  JSON.parse((await fsPromise.readFile(`${cwd()}/nimbus-ts.json`)).toString('utf8')) as NimbusTsConfig
