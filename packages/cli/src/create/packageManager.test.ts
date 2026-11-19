// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createAppInstallCommand, formatRunScript, readPackageManager } from './packageManager'

describe('readPackageManager', () => {
  it.each([
    ['npm/11.4.0 node/v24.1.0 win32 x64 workspaces/false', 'npm', false],
    ['pnpm/10.4.1 npm/? node/v24.1.0 linux x64', 'pnpm', false],
    ['yarn/1.22.22 npm/? node/v24.1.0 darwin arm64', 'yarn', false],
    ['yarn/4.9.1 npm/? node/v24.1.0 darwin arm64', 'yarn', true],
    ['bun/1.2.15 npm/? node/v24.3.0 linux x64', 'bun', false],
  ])('reads %s', (userAgent, name, isYarnBerry) => {
    expect(readPackageManager(userAgent)).toEqual({ name, isYarnBerry })
  })

  it('is npm when nothing, or something else, ran it', () => {
    expect(readPackageManager(undefined)).toEqual({ name: 'npm', isYarnBerry: false })
    expect(readPackageManager('deno/2.3.0')).toEqual({ name: 'npm', isYarnBerry: false })
  })
})

describe('createAppInstallCommand', () => {
  it('installs with no scripts, the way each package manager takes it', () => {
    expect(createAppInstallCommand({ name: 'pnpm', isYarnBerry: false })).toEqual({
      command: 'pnpm',
      args: ['install', '--ignore-scripts'],
      env: {},
    })
    expect(createAppInstallCommand({ name: 'yarn', isYarnBerry: true })).toEqual({
      command: 'yarn',
      args: ['install'],
      env: { YARN_ENABLE_SCRIPTS: 'false' },
    })
  })
})

describe('formatRunScript', () => {
  it('runs a script as each package manager types it', () => {
    expect(formatRunScript({ name: 'npm', isYarnBerry: false }, 'dev')).toBe('npm run dev')
    expect(formatRunScript({ name: 'bun', isYarnBerry: false }, 'dev')).toBe('bun run dev')
    expect(formatRunScript({ name: 'pnpm', isYarnBerry: false }, 'dev')).toBe('pnpm dev')
    expect(formatRunScript({ name: 'yarn', isYarnBerry: true }, 'dev')).toBe('yarn dev')
  })
})
