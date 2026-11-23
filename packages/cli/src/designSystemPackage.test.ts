// @vitest-environment node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { APP_PACKAGE, APP_PACKAGE_VERSION, DESIGN_SYSTEM_PACKAGE } from './designSystemPackage'

const read = (folder: string) =>
  JSON.parse(readFileSync(join(import.meta.dirname, '../..', folder, 'package.json'), 'utf8'))

describe('the packages init and create name', () => {
  it('installs the umbrella, and checks React against the component library', () => {
    expect(APP_PACKAGE).toBe('@soroush.design/react')
    expect(DESIGN_SYSTEM_PACKAGE).toBe('@soroush.design/react-components')
  })

  it("names the packages the workspace's package.json files name", () => {
    expect(read('react').name).toBe('@soroush.design/react')
    expect(read('react-components').name).toBe('@soroush.design/react-components')
  })

  it("bundles the version of the umbrella the workspace has, not the library's", () => {
    expect(APP_PACKAGE_VERSION).toBe(read('react').version)
  })
})
