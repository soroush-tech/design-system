// @vitest-environment node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { APP_PACKAGE, APP_PACKAGE_VERSION } from './designSystemPackage'

const read = (folder: string) =>
  JSON.parse(readFileSync(join(import.meta.dirname, '../..', folder, 'package.json'), 'utf8'))

describe('the package init and create name', () => {
  it('installs the React package, and checks React against it', () => {
    expect(APP_PACKAGE).toBe('@soroush.design/react')
  })

  it("names the package the workspace's package.json names", () => {
    expect(read('react').name).toBe('@soroush.design/react')
  })

  it('bundles the version the workspace has', () => {
    expect(APP_PACKAGE_VERSION).toBe(read('react').version)
  })
})
