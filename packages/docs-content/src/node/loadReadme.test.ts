import { describe, it, expect } from 'vitest'
import { componentBySlug } from '../registry'
import {
  listComponentReadmes,
  loadPackageFile,
  loadReadme,
  loadRepoFile,
  packageDir,
} from './loadReadme'

describe('packageDir', () => {
  it('points at the workspace package', () => {
    expect(packageDir('react').replace(/\\/g, '/')).toMatch(/packages\/react$/)
    expect(packageDir('cli').replace(/\\/g, '/')).toMatch(/packages\/cli$/)
  })

  it('fails for a package that lives in its own repository', () => {
    expect(() => packageDir('styled-system')).toThrow('its own repository')
  })
})

describe('loadReadme', () => {
  it('reads a top-level component README', () => {
    expect(loadReadme(componentBySlug.get('button')!)).toContain('# Button')
  })

  it('reads a container primary README one level down', () => {
    expect(loadReadme(componentBySlug.get('table')!)).toContain('# Table')
  })

  it('reads a markdown package component README', () => {
    expect(loadReadme(componentBySlug.get('preview')!)).toContain('# Preview')
  })
})

describe('loadPackageFile', () => {
  it('reads a file relative to the package directory', () => {
    expect(loadPackageFile('mcp', 'package.json')).toBeTruthy()
  })
})

describe('loadRepoFile', () => {
  it('reads a file relative to the repo root', () => {
    expect(loadRepoFile('pnpm-workspace.yaml')).toContain('packages:')
  })
})

describe('listComponentReadmes', () => {
  it('finds both glob levels, sorted', () => {
    const found = listComponentReadmes('react')
    expect(found).toContain('Button/README.md')
    expect(found).toContain('Table/Table/README.md')
    expect([...found].sort()).toEqual(found)
  })
})
