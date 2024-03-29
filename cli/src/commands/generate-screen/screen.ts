import path from 'path'
import fsPromise from 'fs/promises'
import { upperFirst, camelCase } from 'lodash'
import { pathExists } from 'fs-extra'
import { logger } from '../../utils'
import { NimbusTsConfig } from '../types'
import { GenerateScreenOptions } from './types'

export const generateScreenCodeFromBoilerplate = async (screenName: string, options: GenerateScreenOptions) => {
  const formattedScreenName = upperFirst(camelCase(screenName))
  const screenProps = {
    ...(options.withRouteParams ? { routeParams: { your: 'routeParams' } } : {}),
    ...(options.withHeaders ? { headers: { your: 'headers' } } : {}),
    ...(options.withBody ? { body: { your: 'body' } } : {}),
    ...(options.withQuery ? { query: { your: 'query' } } : {}),
  }
  const screenHasProps = Object.keys(screenProps).length > 0
  const screenPropsName = `${formattedScreenName}Props`
  const expressionsToReplace = [
    {
      expression: '// [generated-screen-import-screen]',
      newText: screenHasProps ? 'import { Screen } from \'@zup-it/nimbus-backend-express\'' : '',
    },
    {
      expression: '// [generated-screen-props]',
      newText: screenHasProps
        ? `\r\ninterface ${screenPropsName}${JSON.stringify(screenProps, null, 2)}\r\n`
        : '',
    },
    {
      expression: 'GeneratedScreenName',
      newText: `${formattedScreenName}${screenHasProps ? `: Screen<${screenPropsName}>` : ''}`,
    },
    {
      expression: '[formatted-screen-name]',
      newText: formattedScreenName,
    },
  ]

  let screenBoilerplateContent = (
    await fsPromise.readFile(path.resolve(__dirname, 'templates/screen/index.tsx'))
  ).toString('utf8')

  screenBoilerplateContent = expressionsToReplace.reduce((content, current) => (
    content = content.replaceAll(current.expression, current.newText)
  ), screenBoilerplateContent)

  return screenBoilerplateContent
}

export const updateRouteFile = async (screenName: string, screenPath: string, configs: NimbusTsConfig) => {
  try {
    const routesFileExists = await pathExists(configs.routes.filePath)
    if (routesFileExists) {
      const routesFileContent = (await fsPromise.readFile(configs.routes.filePath)).toString('utf8')
      const updatedCode = getUpdatedRoutesFileCode(routesFileContent, screenName, screenPath, configs)
      await fsPromise.writeFile(configs.routes.filePath, updatedCode)
      logger.info('- Routes file updated!')
    }
  } catch (error) {
    logger.error(error)
    logger.error('ERROR - Could not update routes file')
  }
}

const getUpdatedRoutesFileCode = (
  routesFileContent: string,
  screenName: string,
  screenPath: string,
  configs: NimbusTsConfig,
) => {
  const varCodeBlock = routesFileContent.match(new RegExp(`${configs.routes.varName}.*?{([\\s\\S]*?)}`, 'gm'))
  const formattedName = upperFirst(camelCase(screenName))

  if (varCodeBlock && varCodeBlock.length) {
    const routes = varCodeBlock[0].match(/'.*?':.*?[,|\n]/gm)
    const importsCode = routesFileContent.match(/import {.*} from '.*?'\n/gm)

    if (routes && routes.length && importsCode && importsCode.length) {
      const onlyFolderPathRegExp = /\/[^\/]+$|\/$/gm
      let relativePath = path.relative(
        screenPath.replaceAll(onlyFolderPathRegExp, ''),
        configs.routes.filePath.replaceAll(onlyFolderPathRegExp, '')
      ).replaceAll('\\', '/')
      relativePath = `${relativePath ? '' : '.'}/${screenName}`

      const lastImport = importsCode[importsCode.length - 1]
      const newImport = `${lastImport}import { ${formattedName} } from '${relativePath}'\r\n`
      routesFileContent = routesFileContent.replaceAll(lastImport, newImport)

      const lastRoute = routes[routes.length - 1]
      const lastRouteLastChar = lastRoute[lastRoute.length - 1] === ',' ? '' : ','
      const newRoute = `${lastRoute}${lastRouteLastChar}\r\n  '/${screenName}': ${formattedName},`
      routesFileContent = routesFileContent.replaceAll(lastRoute, newRoute)

      return routesFileContent
    }

    throw new Error('ERROR - Could not find the routes declaration under the routes var defined on the config file.')
  }

  throw new Error('ERROR - Could not find the routes variable code block')
}
