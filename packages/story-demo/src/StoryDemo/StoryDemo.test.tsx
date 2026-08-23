import type { ReactNode } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import * as sampleStories from '../utils/__fixtures__/Sample.stories'
import sampleRaw from '../utils/__fixtures__/Sample.stories.tsx?raw'
import { StoryDemo, type StoriesModule } from './StoryDemo'

vi.mock('./LiveCode', () => ({
  LiveCode: ({
    code,
    scope,
    helpersText,
    onCodeChange,
    toolbar,
  }: {
    code: string
    scope: Record<string, unknown>
    helpersText: string
    onCodeChange: (code: string) => void
    toolbar?: ReactNode
  }) => (
    <div>
      <button type="button" onClick={() => onCodeChange('EDITED BUFFER')}>
        simulate edit
      </button>
      <pre data-testid="live-editor">{code}</pre>
      <pre data-testid="live-scope">{Object.keys(scope).join(',')}</pre>
      <pre data-testid="live-helpers">{helpersText}</pre>
      {toolbar}
    </div>
  ),
}))

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const stories = sampleStories as unknown as StoriesModule
const renderDemo = (
  props: Partial<React.ComponentProps<typeof StoryDemo>> & { storyName: string }
) =>
  render(
    <ThemeProvider theme={theme}>
      <StoryDemo stories={stories} source={sampleRaw} title="Demo title" {...props} />
    </ThemeProvider>
  )

const editorText = async () => (await screen.findByTestId('live-editor')).textContent!

const writeText = vi.fn()

beforeEach(() => {
  writeText.mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('StoryDemo', () => {
  it('renders heading, description, and the live editor with the collapsed example', async () => {
    renderDemo({ storyName: 'Default', description: 'Some words.' })
    expect(screen.getByRole('heading', { name: 'Demo title' })).toBeInTheDocument()
    expect(screen.getByText('Some words.')).toBeInTheDocument()
    const code = await editorText()
    expect(code).toContain('<Sample size="md" aria-label="A sample">Sample</Sample>')
    expect(code).not.toContain('import')
  })

  it('reveals imports and the Demo wrapper on expand, and collapses back', async () => {
    renderDemo({ storyName: 'Default' })
    fireEvent.click(screen.getByRole('button', { name: 'Expand code' }))
    let code = await editorText()
    expect(code).toContain("import { Sample } from '@soroush.tech/design-system/Sample'")
    expect(code).toContain('export default function Demo()')
    fireEvent.click(screen.getByRole('button', { name: 'Collapse code' }))
    code = await editorText()
    expect(code).not.toContain('import')
  })

  it('regenerates the buffer when a control changes, discarding manual edits', async () => {
    renderDemo({ storyName: 'Default' })
    fireEvent.click(await screen.findByRole('button', { name: 'simulate edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Controls' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'size' }), {
      target: { value: 'sm' },
    })
    expect(await editorText()).toContain('size="sm"')
    // The edit was dropped by the regeneration - copy returns the generated code.
    fireEvent.click(screen.getByRole('button', { name: 'Copy the source' }))
    await waitFor(() => expect(writeText).toHaveBeenCalled())
    expect(writeText.mock.calls[0][0]).toContain('size="sm"')
  })

  it('offers controls to render(args) and pattern stories but not render-only ones', async () => {
    const first = renderDemo({ storyName: 'Grouped' })
    expect(await screen.findByRole('button', { name: 'Controls' })).toBeInTheDocument()
    first.unmount()
    const second = renderDemo({ storyName: 'Destructured' })
    expect(await screen.findByRole('button', { name: 'Controls' })).toBeInTheDocument()
    second.unmount()
    renderDemo({ storyName: 'Sizes' })
    await screen.findByTestId('live-editor')
    expect(screen.queryByRole('button', { name: 'Controls' })).not.toBeInTheDocument()
  })

  it('passes hidden helpers along for collapsed evaluation', async () => {
    renderDemo({ storyName: 'Grouped' })
    expect((await screen.findByTestId('live-helpers')).textContent).toContain('const items = [')
  })

  it('shows the JavaScript view when toggled, in both expansion states', async () => {
    renderDemo({ storyName: 'Sizes' })
    expect(await editorText()).toContain('as const')
    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    expect(await editorText()).not.toContain('as const')
    expect(screen.getByRole('button', { name: 'TS' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Expand code' }))
    const code = await editorText()
    expect(code).toContain('export default function Demo()')
    expect(code).not.toContain('as const')
  })

  it('shows the JavaScript view for args-const previews without crashing', async () => {
    renderDemo({ storyName: 'Grouped' })
    await screen.findByTestId('live-editor')
    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    // The args const and the bare JSX statement transpile per section - joined they
    // would parse as one relational expression and throw.
    const code = await editorText()
    expect(code).toContain("'aria-label': 'A sample'")
    expect(code).toContain('<Sample {...args}>{items}</Sample>')
    // The TS view's props-type annotation is gone in the JS view.
    expect(code).not.toContain('Partial<')
  })

  it('copies the buffer - generated first, the edit after typing', async () => {
    renderDemo({ storyName: 'Default' })
    await screen.findByTestId('live-editor')
    fireEvent.click(screen.getByRole('button', { name: 'Copy the source' }))
    await waitFor(() => expect(writeText).toHaveBeenCalled())
    expect(writeText.mock.calls[0][0]).toContain('<Sample size="md"')
    fireEvent.click(screen.getByRole('button', { name: 'simulate edit' }))
    fireEvent.click(screen.getByRole('button', { name: /^(Copy the source|Copied)$/ }))
    await waitFor(() => expect(writeText).toHaveBeenLastCalledWith('EDITED BUFFER'))
  })

  it('exports the full module to CodeSandbox, assembling edited snippets', async () => {
    const submitSpy = vi
      .spyOn(HTMLFormElement.prototype, 'submit')
      .mockImplementation(function (this: HTMLFormElement) {})
    renderDemo({
      storyName: 'Default',
      versions: { '@soroush.tech/design-system': '^1.0.0' },
      reactVersion: '^19.2.8',
      packageName: '@soroush.tech/design-system',
    })
    await screen.findByTestId('live-editor')
    fireEvent.click(screen.getByRole('button', { name: 'Edit in CodeSandbox' }))
    expect(submitSpy).toHaveBeenCalledTimes(1)
    // An edited collapsed buffer is completed with the hidden imports and helpers.
    fireEvent.click(screen.getByRole('button', { name: 'simulate edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit in CodeSandbox' }))
    expect(submitSpy).toHaveBeenCalledTimes(2)
    // And in the JavaScript view the hidden sections are transpiled first.
    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    fireEvent.click(screen.getByRole('button', { name: 'simulate edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit in CodeSandbox' }))
    expect(submitSpy).toHaveBeenCalledTimes(3)
  })

  it('reset clears control overrides and manual edits', async () => {
    renderDemo({ storyName: 'Default' })
    fireEvent.click(await screen.findByRole('button', { name: 'Controls' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'size' }), {
      target: { value: 'sm' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'simulate edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(await editorText()).toContain('size="md"')
  })

  it('stays read-only until a scope loader resolves, then upgrades to live', async () => {
    let resolveScope!: (value: Record<string, unknown>) => void
    const loadScope = vi.fn(
      () => new Promise<Record<string, unknown>>((resolve) => (resolveScope = resolve))
    )
    renderDemo({ storyName: 'Default', scope: loadScope })
    // Read-only fallback: highlighted code panel, no editor.
    expect(screen.queryByTestId('live-editor')).not.toBeInTheDocument()
    expect(document.querySelector('pre')!.textContent).toContain('<Sample size="md"')
    resolveScope({ Marker: 1 })
    expect((await screen.findByTestId('live-scope')).textContent).toBe('Marker')
  })

  it('keeps the read-only view when the scope loader fails', async () => {
    renderDemo({ storyName: 'Default', scope: () => Promise.reject(new Error('offline')) })
    await waitFor(() => expect(document.querySelector('pre')).toBeInTheDocument())
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(screen.queryByTestId('live-editor')).not.toBeInTheDocument()
  })

  it('ignores a scope that resolves after unmount', async () => {
    let resolveScope!: (value: Record<string, unknown>) => void
    const loadScope = () =>
      new Promise<Record<string, unknown>>((resolve) => (resolveScope = resolve))
    const { unmount } = renderDemo({ storyName: 'Default', scope: loadScope })
    unmount()
    resolveScope({ Marker: 1 })
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(screen.queryByTestId('live-scope')).not.toBeInTheDocument()
  })

  it('throws for a story name the module does not export', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderDemo({ storyName: 'Nope' })).toThrow(/Unknown story "Nope"/)
    consoleError.mockRestore()
  })
})
