import {expect, test} from 'vitest'
import {fromLockFile, fromConfig, SupportedPackageManager} from './main'

const packageManagers = {
  npm: 'package-lock.json',
  pnpm: 'pnpm-lock.yaml',
  yarn: 'yarn.lock',
}

for (const iterator in packageManagers) {
  test(`should parse ${iterator} from package.json`, () => {
    const config = {packageManager: `${iterator}@0.0.0`}
    const result = fromConfig(config)

    expect(result).toBe(
      SupportedPackageManager[
        iterator.toUpperCase() as keyof typeof SupportedPackageManager
      ],
    )
  })

  test(`should parse ${iterator} from files`, () => {
    const result = fromLockFile([
      'package.json',
      packageManagers[iterator as keyof typeof packageManagers],
      'tsconfig.json',
    ])

    expect(result).toBe(
      SupportedPackageManager[
        iterator.toUpperCase() as keyof typeof SupportedPackageManager
      ],
    )
  })
}

test('should return undetermined from package.json', () => {
  const config = {}
  const result = fromConfig(config)

  expect(result).toBe(undefined)
})

test('should return undetermined from files', () => {
  const result = fromLockFile(['package.json', 'tsconfig.json'])

  expect(result).toBe(undefined)
})
