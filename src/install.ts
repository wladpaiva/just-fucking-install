import {determinePackageManager} from './package-manager.js'
import picocolors from 'picocolors'
import {SupportedPackageManager} from './support.js'
import {execute} from './execute.js'
import clsx from 'clsx'

const BASE_COLORS = {
  [SupportedPackageManager.NPM]: 'red',
  [SupportedPackageManager.YARN]: 'blue',
  [SupportedPackageManager.PNPM]: 'yellow',
} as const

interface InstallOptions {
  '--'?: string[]
  D?: boolean
  saveDev?: boolean
}

export const install = async (packages: string[], options?: InstallOptions) => {
  const packageManager = await determinePackageManager()

  !process.env.VITEST &&
    console.log(
      [
        picocolors.dim('Fucking installing packages with'),
        picocolors.reset(
          picocolors[BASE_COLORS[packageManager]](packageManager),
        ),
      ].join(' '),
    )

  switch (packageManager) {
    case SupportedPackageManager.NPM:
      return await execute(
        clsx('npm install', packages, {
          '--save-dev': options?.saveDev,
        }),
      )

    case SupportedPackageManager.YARN:
      return await execute(
        clsx('yarn add', packages, {
          '--dev': options?.saveDev,
        }),
      )

    case SupportedPackageManager.PNPM:
      return await execute(
        clsx('pnpm install', packages, {
          '--save-dev': options?.saveDev,
        }),
      )

    default:
      throw new Error('Unsupported package manager')
  }
}
