import {
  determinePackageManager,
  SupportedPackageManager,
} from './package-manager.js'
import chalk from 'chalk'

const baseColors = {
  [SupportedPackageManager.NPM]: '#d70000',
  [SupportedPackageManager.YARN]: '#87afff',
  [SupportedPackageManager.PNPM]: '#ffd700',
}

export const install = async (packages: string[], options: unknown) => {
  const packageManager = await determinePackageManager()

  console.log(
    `${chalk.hex(baseColors[packageManager])(
      packageManager,
    )} fucking installing`,
  )

  // TODO: pass options down to npm
}
