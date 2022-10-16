import fsPromises from 'fs/promises'
import path from 'path'
import {SupportedPackageManager} from './support.js'
// import {fileURLToPath} from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

type PackageJson = {
  packageManager?: string
}

/**
 * Parse package.json to determine which package manager is used.
 *
 * @param {PackageJson} config
 * @returns {SupportedPackageManager | undefined}
 */
function fromConfig(config: PackageJson) {
  const {packageManager} = config
  const name = packageManager?.split('@')[0]

  if (!name) {
    return
  }

  return SupportedPackageManager[
    name.toUpperCase() as keyof typeof SupportedPackageManager
  ]
}

/**
 * Parse all given filenames to determine which package manager is used.
 *
 * @param {string[]} files
 * @returns {SupportedPackageManager | undefined}
 */
function fromLockFile(files: string[]) {
  if (files.includes('package-lock.json')) {
    return SupportedPackageManager.NPM
  } else if (files.includes('pnpm-lock.yaml')) {
    return SupportedPackageManager.PNPM
  } else if (files.includes('yarn.lock')) {
    return SupportedPackageManager.YARN
  }

  return undefined
}

/**
 * Determine which package manager is used in the current folder.
 * @returns {SupportedPackageManager}
 */
export async function determinePackageManager() {
  // read the package.json file in the current directory
  const filePath = path.resolve(process.cwd(), './package.json')
  let data
  try {
    data = await fsPromises.readFile(filePath)
  } catch (error) {
    data = '{}'
  }
  const json = JSON.parse(data.toString())

  // determine the package manager based the package.json file
  let packageManager = fromConfig(json)

  // if the package manager is not defined, then try to determine it from the lock file
  if (!packageManager) {
    const dir = process.cwd()
    const files = await fsPromises.readdir(dir)
    packageManager = fromLockFile(files)
  }

  if (!packageManager) {
    // TODO: use the default package manager
    throw new Error(
      'Unable to determine which package manager to use. Please specify the package manager in the package.json file.',
    )
  }

  return packageManager
}
