import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Collapse, type CollapseProps } from './Collapse'

// Real layout: the content's height and width are measured, and the root moves to them.

const root = () => screen.getByTestId('collapse')
const view = (props: Partial<CollapseProps> = {}) => (
  <Collapse data-testid="collapse" timeout={40} {...props}>
    <div style={{ width: '120px', height: '60px' }}>Content</div>
  </Collapse>
)

describe('Collapse in a browser', () => {
  it('opens to the height of its content and leaves the height to it', async () => {
    const { rerender } = renderWithTheme(view())
    expect(root().getBoundingClientRect().height).toBe(0)
    rerender(view({ isShown: true }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().height).toBe(60))
    await vi.waitFor(() => expect(root().style.height).toBe(''))
    expect(root().getBoundingClientRect().height).toBe(60)
  })

  it('closes to nothing, or to its collapsed size', async () => {
    const { rerender } = renderWithTheme(view({ isShown: true, shouldAppear: false }))
    expect(root().getBoundingClientRect().height).toBe(60)
    rerender(view({ isShown: false, collapsedSize: 20 }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().height).toBe(20))
    rerender(view({ isShown: true, collapsedSize: 20 }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().height).toBe(60))
    rerender(view({ isShown: false }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().height).toBe(0))
  })

  it('opens by the width of its content when horizontal', async () => {
    const { rerender } = renderWithTheme(view({ orientation: 'horizontal' }))
    expect(root().getBoundingClientRect().width).toBe(0)
    rerender(view({ orientation: 'horizontal', isShown: true }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().width).toBe(120))
  })

  it('keeps showing content that grows once it is open', async () => {
    const { rerender } = renderWithTheme(view())
    rerender(view({ isShown: true }))
    await vi.waitFor(() => expect(root().getBoundingClientRect().height).toBe(60))
    await vi.waitFor(() => expect(root().style.height).toBe(''))
    const content = screen.getByText('Content')
    content.style.height = '90px'
    expect(root().getBoundingClientRect().height).toBe(90)
  })
})
