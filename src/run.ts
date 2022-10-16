import {determinePackageManager} from './package-manager.js'
import {SupportedPackageManager} from './support.js'
import {execute} from './execute.js'
import clsx from 'clsx'

interface RunOptions {
  '--'?: string[]
}

export const run = async (script: string, options?: RunOptions) => {
  const packageManager = await determinePackageManager()

  switch (packageManager) {
    case SupportedPackageManager.NPM:
      return await execute(clsx('npm run', script, {}))

    case SupportedPackageManager.YARN:
      return await execute(clsx('yarn run', script, {}))

    case SupportedPackageManager.PNPM:
      return await execute(clsx('pnpm run', script, {}))

    default:
      throw new Error('Unsupported package manager')
  }
}
