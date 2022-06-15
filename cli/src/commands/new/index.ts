import { cwd, exit } from 'process'
import { execShellCommand, logger } from '../../utils'
import { folderNameIsValid, pathExists } from '../utils'
import { createFolder } from '../utils/path'
import { copyBoilerplateUpdatingFilesContent, createNimbusTsConfigFile } from './hierarchy'
import { NewProjectOptions } from './types'

export const newProject = async (projectName: string, options: NewProjectOptions) => {
  logger.info('Nimbus TypeScript CLI: Creating New Project:')
  if (!folderNameIsValid(projectName)) {
    logger.error('The project name is not valid for a folder name!')
    exit(1)
  }
  if (await pathExists(projectName)) {
    logger.error('There is already a folder with the same name!')
    exit(1)
  }

  logger.info(`1 - Nimbus: Preparing to create the project: "${projectName}"...`)
  await createFolder(projectName)
  logger.info('2 - Nimbus: Creating new files...')
  await copyBoilerplateUpdatingFilesContent(projectName, options)
  logger.info('3 - Nimbus: Creating configuration file...')
  await createNimbusTsConfigFile(projectName, options)
  logger.info('4 - Nimbus: Installing dependencies...')
  await execShellCommand('npm install', { cwd: `${cwd()}/${projectName}` })

  logger.success(`Nimbus: All done! The project was created under the folder: "${projectName}".`)
  exit()
}
