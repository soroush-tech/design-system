import { describe, it, expect } from 'vitest'
import { buildSandboxProject } from './buildSandboxProject'

const SOURCE = "import { Button } from '@soroush.tech/design-system/Button'\n<Button />"
const OPTIONS = {
  versions: { '@soroush.tech/design-system': '^1.2.3' },
  reactVersion: '^19.2.8',
}

describe('buildSandboxProject', () => {
  it('assembles a runnable TypeScript project around the demo source', () => {
    const files = buildSandboxProject('Basic button group', SOURCE, { ...OPTIONS, language: 'ts' })
    expect(files['src/Demo.tsx'].content).toBe(SOURCE)
    expect(files['public/index.html'].content).toContain('id="root"')
    expect(files['src/index.tsx'].content).toContain('ThemeProvider')
    expect(files['tsconfig.json']).toBeDefined()
    const manifest = files['package.json'].content as {
      name: string
      main: string
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
    expect(manifest.name).toBe('basic-button-group-demo')
    expect(manifest.main).toBe('src/index.tsx')
    expect(manifest.dependencies['@soroush.tech/design-system']).toBe('^1.2.3')
    expect(manifest.dependencies.react).toBe('^19.2.8')
    expect(manifest.dependencies['react-dom']).toBe('^19.2.8')
    expect(manifest.devDependencies.typescript).toBe('latest')
  })

  it('assembles a plain JavaScript project when language is js', () => {
    const files = buildSandboxProject('Basic button group', SOURCE, { ...OPTIONS, language: 'js' })
    expect(files['src/Demo.jsx'].content).toBe(SOURCE)
    expect(files['src/Demo.tsx']).toBeUndefined()
    expect(files['tsconfig.json']).toBeUndefined()
    const indexSource = files['src/index.jsx'].content as string
    expect(indexSource).toContain('ThemeProvider')
    // The non-null assertion is stripped from the transpiled entry.
    expect(indexSource).not.toContain("getElementById('root')!")
    const manifest = files['package.json'].content as {
      main: string
      devDependencies: Record<string, string>
    }
    expect(manifest.main).toBe('src/index.jsx')
    expect(manifest.devDependencies.typescript).toBeUndefined()
    expect(manifest.devDependencies['@types/react']).toBeUndefined()
  })
})
