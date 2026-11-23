import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { repoRoot } from './node/repoRoot'
import { sectionIds, sections } from './sections'

const manifestOf = (dir: string): { name: string } =>
  JSON.parse(readFileSync(join(repoRoot(), 'packages', dir, 'package.json'), 'utf8'))

describe('sections', () => {
  it('describes the six sections of the site, in its order', () => {
    expect(sectionIds).toEqual([
      'design-system',
      'markdown',
      'styled-system',
      'mcp',
      'ui-spec',
      'cli',
    ])
  })

  it('keys each description by its id', () => {
    for (const id of sectionIds) expect(sections[id].id).toBe(id)
  })

  it('names the folder and the npm package that are on disk', () => {
    for (const { id, dir, npm } of Object.values(sections)) {
      expect(existsSync(join(repoRoot(), 'packages', dir)), `${id}: packages/${dir} missing`).toBe(
        true
      )
      expect(manifestOf(dir).name, `${id}: packages/${dir}/package.json`).toBe(npm)
    }
  })

  it('tags a release as <npm name>@<version>, and keeps former prefixes apart', () => {
    for (const { id, npm, tagPrefix, formerTagPrefixes } of Object.values(sections)) {
      expect(tagPrefix, id).toBe(`${npm}@`)
      for (const former of formerTagPrefixes) {
        expect(former, id).toMatch(/^@[\w.-]+\/[\w.-]+@$/)
        expect(former, id).not.toBe(tagPrefix)
      }
    }
  })
})
