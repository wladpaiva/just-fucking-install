import {expect, test, vi, afterEach, beforeEach, describe} from 'vitest'
import {install} from './install.js'
import {execute} from './execute.js'
import {SupportedPackageManager} from './support.js'

let packageManager: SupportedPackageManager

beforeEach(() => {
  packageManager = SupportedPackageManager.NPM
})

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('./package-manager.js', () => {
  return {
    determinePackageManager: async () => packageManager,
  }
})

vi.mock('./execute.js', () => {
  return {
    execute: vi.fn(),
  }
})

test('Install packages using NPM', async () => {
  packageManager = SupportedPackageManager.NPM
  const packages = ['foo', 'bar']
  const options = {}
  await install(packages, options)

  expect(execute).toHaveBeenCalledWith(`npm install foo bar`)
})

test('Install packages using YARN', async () => {
  packageManager = SupportedPackageManager.YARN
  const packages = ['foo', 'bar']
  const options = {}
  await install(packages, options)

  expect(execute).toHaveBeenCalledWith(`yarn add foo bar`)
})

test('Install packages using PNPM', async () => {
  packageManager = SupportedPackageManager.PNPM
  const packages = ['foo', 'bar']
  const options = {}
  await install(packages, options)

  expect(execute).toHaveBeenCalledWith(`pnpm install foo bar`)
})

describe('Should save as dev dependencies', () => {
  test('Install packages using NPM', async () => {
    packageManager = SupportedPackageManager.NPM
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await install(packages, options)

    expect(execute).toHaveBeenCalledWith(`npm install foo bar --save-dev`)
  })
  test('Install packages using YARN', async () => {
    packageManager = SupportedPackageManager.YARN
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await install(packages, options)

    expect(execute).toHaveBeenCalledWith(`yarn add foo bar --dev`)
  })
  test('Install packages using PNPM', async () => {
    packageManager = SupportedPackageManager.PNPM
    const packages = ['foo', 'bar']
    const options = {saveDev: true}
    await install(packages, options)

    expect(execute).toHaveBeenCalledWith(`pnpm install foo bar --save-dev`)
  })
})
