import path from 'path'
import fsPromise from 'fs/promises'
import { cwd } from 'process'
import fse from 'fs-extra'
import { NewProjectOptions, ProjectFile } from './types'

const BOILERPLATE_PATH = path.resolve(__dirname, 'templates/boilerplate')
const PROJECT_NAME_PLACEHOLDER = 'nimbus-ts-cli-project-name'
const PORT_PLACEHOLDER = 'nimbus-ts-cli-port'

const projectFilesToChange: Array<ProjectFile> = [
  {
    name: 'package.json',
    action: (content: string, projectName: string) =>
      content.replace(PROJECT_NAME_PLACEHOLDER, projectName),
  },
  {
    name: 'README.md',
    action: (content: string, projectName: string, options: NewProjectOptions) =>
      content
        .replace(PROJECT_NAME_PLACEHOLDER, projectName)
        .replace(PORT_PLACEHOLDER, options.port),
  },
]

// some files like ".gitignore" are never uploaded in an npm package, so we need to rename it
const projectFilesToRename: Record<string, string> = {
  gitignore: '.gitignore',
}

export const copyBoilerplateUpdatingFilesContent = async (newFolderName: string, options: NewProjectOptions) => {
  const boilerplateContent = await fsPromise.readdir(BOILERPLATE_PATH)
  const projectFolder = `${cwd()}/${newFolderName}`

  for (const file of boilerplateContent) {
    fse.copySync(`${BOILERPLATE_PATH}/${file}`, `${projectFolder}/${file}`)
  }

  for (const file of projectFilesToChange) {
    const path = `${projectFolder}/${file.name}`
    let fileContent = (await fsPromise.readFile(path)).toString('utf8')
    fileContent = file.action(fileContent, newFolderName, options)
    await fsPromise.writeFile(path, fileContent)
  }

  for (const filename in projectFilesToRename) {
    await fsPromise.rename(`${projectFolder}/${filename}`, `${projectFolder}/${projectFilesToRename[filename]}`)
  }
}

export const createNimbusTsConfigFile = async (projectName: string, options: NewProjectOptions) => {
  const { port, basePath } = options
  const projectFolder = `${cwd()}/${projectName}`
  await fsPromise.writeFile(
    `${projectFolder}/nimbus-ts.json`,
    JSON.stringify({
      projectName,
      port,
      basePath,
      screensFolderPath: 'src/screens',
      routes: {
        filePath: 'src/screens/index.ts',
        varName: 'routes',
      },
    },
    null, 2)
  )
}
