import {expect, test, vi, afterEach, beforeEach, describe} from 'vitest'
import {determinePackageManager} from './package-manager.js'
import {SupportedPackageManager} from './support.js'

let config: {
  packageManager?: string
}

let files: string[]

beforeEach(() => {
  config = {}
  files = []
})

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('fs/promises', () => {
  return {
    default: {
      readFile: async () => JSON.stringify(config),
      readdir: async () => files,
    },
  }
})

describe('Determine package manager from package.json settings', () => {
  test('Identify NPM', async () => {
    config = {packageManager: `npm@0.0.0`}
    const result = await determinePackageManager()
    expect(result).toBe(SupportedPackageManager.NPM)
  })

  test('Identify YARN', async () => {
    config = {packageManager: `yarn@0.0.0`}
    const result = await determinePackageManager()
    expect(result).toBe(SupportedPackageManager.YARN)
  })

  test('Identify PNPM', async () => {
    config = {packageManager: `pnpm@0.0.0`}
    const result = await determinePackageManager()
    expect(result).toBe(SupportedPackageManager.PNPM)
  })
})

describe('Determine package manager from lock file', () => {
  test('Identify NPM', async () => {
    files = ['package.json', 'package-lock.json', 'tsconfig.json']
    const result = await determinePackageManager()

    expect(result).toBe(SupportedPackageManager.NPM)
  })

  test('Identify YARN', async () => {
    files = ['package.json', 'yarn.lock', 'tsconfig.json']
    const result = await determinePackageManager()

    expect(result).toBe(SupportedPackageManager.YARN)
  })

  test('Identify NPM', async () => {
    files = ['package.json', 'pnpm-lock.yaml', 'tsconfig.json']
    const result = await determinePackageManager()

    expect(result).toBe(SupportedPackageManager.PNPM)
  })
})
