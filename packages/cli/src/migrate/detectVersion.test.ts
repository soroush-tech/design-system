// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createTestApp } from '../testApp'
import { detectAppVersion } from './detectVersion'

const PACKAGES = ['@test/a', '@test/b']
const installed = (name: string, version: string) => ({
  [`node_modules/${name}/package.json`]: JSON.stringify({ name, version }),
})

describe('detectAppVersion', () => {
  it('reads the installed version', () => {
    const root = createTestApp(installed('@test/a', '1.4.0'))
    expect(detectAppVersion(root, { dependencies: { '@test/a': '^1.2.0' } }, PACKAGES)).toEqual({
      package: '@test/a',
      version: '1.4.0',
    })
  })

  it('takes the declared range when the install is behind it: the app was moved, not installed', () => {
    const root = createTestApp(installed('@test/a', '1.0.0'))
    expect(detectAppVersion(root, { devDependencies: { '@test/a': '^1.2.0' } }, PACKAGES)).toEqual({
      package: '@test/a',
      version: '1.2.0',
    })
  })

  it('takes the installed version when the range names none', () => {
    const root = createTestApp(installed('@test/a', '1.4.0'))
    expect(detectAppVersion(root, { dependencies: { '@test/a': 'latest' } }, PACKAGES)).toEqual({
      package: '@test/a',
      version: '1.4.0',
    })
  })

  it('falls back to the lowest version of the range, with a note, when nothing is installed', () => {
    const root = createTestApp()
    expect(detectAppVersion(root, { dependencies: { '@test/a': '~1.2.3' } }, PACKAGES)).toEqual({
      package: '@test/a',
      version: '1.2.3',
      note: '@test/a is not installed here, so its version is the lowest ~1.2.3 allows.',
    })
  })

  it('prefers the package earlier in the list, the newest', () => {
    const root = createTestApp()
    const dependencies = { '@test/a': '^1.0.0', '@test/b': '^2.0.0' }
    expect(detectAppVersion(root, { dependencies }, PACKAGES)).toMatchObject({ package: '@test/a' })
    expect(detectAppVersion(root, { dependencies }, ['@test/b'])).toMatchObject({
      package: '@test/b',
    })
  })

  it('says why when it finds no package, or no version', () => {
    const root = createTestApp()
    expect(detectAppVersion(root, {}, PACKAGES)).toBe(
      'migrate found none of @test/a, @test/b in package.json. Run it in the folder of the app to move.'
    )
    expect(detectAppVersion(root, { dependencies: { '@test/a': 'workspace:*' } }, PACKAGES)).toBe(
      'migrate cannot tell which version of @test/a this app is on: package.json says "workspace:*". Install it, or give it a version, and run migrate again.'
    )
  })
})
