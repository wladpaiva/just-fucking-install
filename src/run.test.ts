import {expect, test, vi, afterEach, beforeEach, describe} from 'vitest'
import {run} from './run.js'
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

test('Run script using NPM', async () => {
  packageManager = SupportedPackageManager.NPM
  const script = 'foo'
  const options = {}
  await run(script, options)

  expect(execute).toHaveBeenCalledWith(`npm run foo`)
})

test('Run script using YARN', async () => {
  packageManager = SupportedPackageManager.YARN
  const script = 'foo'
  const options = {}
  await run(script, options)

  expect(execute).toHaveBeenCalledWith(`yarn run foo`)
})

test('Run script using PNPM', async () => {
  packageManager = SupportedPackageManager.PNPM
  const script = 'foo'
  const options = {}
  await run(script, options)

  expect(execute).toHaveBeenCalledWith(`pnpm run foo`)
})
