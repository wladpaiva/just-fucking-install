import {expect, test, vi, afterEach, beforeEach, describe} from 'vitest'
import {uninstall} from './uninstall.js'
import {execute} from './execute.js'
import {SupportedPackageManager} from './support.js'

let packageManager: SupportedPackageManager

beforeEach(() => {
  packageManager = SupportedPackageManager.NPM
})

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('./execute.js')
vi.mock('./package-manager.js', () => {
  return {
    determinePackageManager: async () => packageManager,
  }
})

test('Uninstall packages using NPM', async () => {
  packageManager = SupportedPackageManager.NPM
  const packages = ['foo', 'bar']
  const options = {}
  await uninstall(packages, options)

  expect(execute).toHaveBeenCalledWith(`npm uninstall foo bar`)
})

test('Uninstall packages using YARN', async () => {
  packageManager = SupportedPackageManager.YARN
  const packages = ['foo', 'bar']
  const options = {}
  await uninstall(packages, options)

  expect(execute).toHaveBeenCalledWith(`yarn remove foo bar`)
})

test('Uninstall packages using PNPM', async () => {
  packageManager = SupportedPackageManager.PNPM
  const packages = ['foo', 'bar']
  const options = {}
  await uninstall(packages, options)

  expect(execute).toHaveBeenCalledWith(`pnpm uninstall foo bar`)
})

describe('Should save as dev dependencies', () => {
  test('Uninstall packages using NPM', async () => {
    packageManager = SupportedPackageManager.NPM
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await uninstall(packages, options)

    expect(execute).toHaveBeenCalledWith(`npm uninstall foo bar --save-dev`)
  })
  test('Uninstall packages using YARN', async () => {
    packageManager = SupportedPackageManager.YARN
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await uninstall(packages, options)

    expect(execute).toHaveBeenCalledWith(`yarn remove foo bar --dev`)
  })
  test('Uninstall packages using PNPM', async () => {
    packageManager = SupportedPackageManager.PNPM
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await uninstall(packages, options)

    expect(execute).toHaveBeenCalledWith(`pnpm uninstall foo bar --save-dev`)
  })
})
