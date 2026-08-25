import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import type { StoriesModule } from '@soroush.tech/story-demo/StoryDemo'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { MdxStoryDemo } from './MdxStoryDemo'

// The real registry eagerly bundles every design-system stories module - far too heavy
// for a unit test. A single synthetic entry exercises the same lookup and wiring.
vi.mock('src/demos/registry', () => {
  const stories: StoriesModule = {
    default: { component: () => null },
    Basic: { render: () => <button type="button">One</button> },
  }
  const source = [
    'const meta: Meta<typeof Widget> = { component: Widget }',
    'export default meta',
    'export const Basic: Story = {',
    '  render: () => <button type="button">One</button>,',
    '}',
  ].join('\n')
  const entry = { path: 'Widget/Basic', title: 'Basic widget', stories, source, storyName: 'Basic' }
  return {
    demoByPath: new Map([[entry.path, entry]]),
    demoVersions: { '@soroush.tech/design-system': '^1.0.0' },
    demoReactVersion: '^19.2.8',
  }
})

vi.mock('src/demos/scopeLoader', () => ({ loadDemoScope: () => Promise.resolve({}) }))

describe('MdxStoryDemo', () => {
  it('renders a registered demo with the story-derived heading', () => {
    renderWithTheme(<MdxStoryDemo of="Widget/Basic" />)
    expect(screen.getByRole('heading', { name: 'Basic widget' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument()
  })

  it('lets the content set a title and description', () => {
    renderWithTheme(<MdxStoryDemo of="Widget/Basic" title="Sizing" description="Both sizes." />)
    expect(screen.getByRole('heading', { name: 'Sizing' })).toBeInTheDocument()
    expect(screen.getByText('Both sizes.')).toBeInTheDocument()
  })

  it('throws on an unregistered demo path', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<MdxStoryDemo of="Nope/Missing" />)).toThrow(
      'Unknown demo "Nope/Missing"'
    )
    consoleError.mockRestore()
  })
})
