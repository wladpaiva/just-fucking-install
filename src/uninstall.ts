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

interface UninstallOptions {
  '--'?: string[]
  D?: boolean
  saveDev?: boolean
}

export const uninstall = async (
  packages: string[],
  options?: UninstallOptions,
) => {
  const packageManager = await determinePackageManager()

  !process.env.VITEST &&
    console.log(
      [
        picocolors.dim('Fucking remove packages with'),
        picocolors.reset(
          picocolors[BASE_COLORS[packageManager]](packageManager),
        ),
      ].join(' '),
    )

  switch (packageManager) {
    case SupportedPackageManager.NPM:
      return await execute(
        clsx('npm uninstall', packages, {
          '--save-dev': options?.saveDev,
        }),
      )

    case SupportedPackageManager.YARN:
      return await execute(
        clsx('yarn remove', packages, {
          '--dev': options?.saveDev,
        }),
      )

    case SupportedPackageManager.PNPM:
      return await execute(
        clsx('pnpm uninstall', packages, {
          '--save-dev': options?.saveDev,
        }),
      )

    default:
      throw new Error('Unsupported package manager')
  }
}
