import { describe, it, expect } from 'vitest'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { content } from '../content'
import { emitContent, renderModule } from './emit'

describe('renderModule', () => {
  it('emits a typed module, not JSON', () => {
    const rendered = renderModule(content)
    expect(rendered).toContain("import type { ContentBundle } from '../types'")
    expect(rendered).toContain('export const bundle: ContentBundle = {')
    expect(rendered).toContain('do not edit')
  })
})

describe('emitContent', () => {
  it('writes the bundle, creating the directory', async () => {
    const outputPath = join(mkdtempSync(join(tmpdir(), 'mcp-emit-')), 'nested', 'content.ts')
    const bundle = await emitContent(outputPath)
    expect(bundle.components.length).toBeGreaterThan(0)
    expect(readFileSync(outputPath, 'utf8')).toContain('export const bundle: ContentBundle')
  })
})
