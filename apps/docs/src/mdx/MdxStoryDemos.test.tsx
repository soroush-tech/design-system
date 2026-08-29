import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { MdxStoryDemos } from './MdxStoryDemos'

// The real registry eagerly bundles every design-system stories module - far too heavy
// for a unit test. Two synthetic entries exercise the lookup and ordering.
vi.mock('src/demos/registry', () => ({
  demosForComponent: (component: string) =>
    component === 'Widget'
      ? [
          { path: 'Widget/Basic', title: 'Basic' },
          { path: 'Widget/Fancy', title: 'Fancy' },
        ]
      : [],
}))

vi.mock('./MdxStoryDemo', () => ({
  MdxStoryDemo: ({ of }: { of: string }) => <div data-testid="demo">{of}</div>,
}))

describe('MdxStoryDemos', () => {
  it('renders one demo per story, in registry order', () => {
    renderWithTheme(<MdxStoryDemos of="Widget" />)
    const demos = screen.getAllByTestId('demo')
    expect(demos.map((demo) => demo.textContent)).toEqual(['Widget/Basic', 'Widget/Fancy'])
  })

  it('throws for a component with no stories', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<MdxStoryDemos of="Nope" />)).toThrow(
      'No stories for component "Nope"'
    )
    consoleError.mockRestore()
  })
})
