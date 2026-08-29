import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
  hydrateRoot: vi.fn(),
}))
vi.mock('src/common/Bootstrap', () => ({ Bootstrap: () => null }))

import { onRenderClient } from './+onRenderClient'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Tests run in declaration order - the module-level `root` variable in
// +onRenderClient progresses naturally: undefined → (hydrateRoot result) → createRoot result.
// hydrateRoot is mocked as vi.fn() which returns undefined by default, so root
// stays falsy after the hydration test, allowing the non-hydration test to
// exercise createRoot on the first CSR call.
describe('+onRenderClient', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    vi.clearAllMocks()
    container = document.createElement('div')
    container.id = 'root'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    document.head.querySelectorAll('[data-mh]').forEach((el) => el.remove())
  })

  it('hydration: calls hydrateRoot', async () => {
    await onRenderClient({ isHydration: true } as never)
    expect(hydrateRoot).toHaveBeenCalledWith(container, expect.anything())
  })

  it('non-hydration: calls createRoot on the first CSR call', async () => {
    await onRenderClient({ isHydration: false } as never)
    expect(createRoot).toHaveBeenCalledWith(container)
  })

  it('non-hydration: syncs the head tags from the page config', async () => {
    await onRenderClient({
      isHydration: false,
      config: { title: 'Components', description: 'Component reference.' },
      urlPathname: '/design-system/components',
    } as never)
    expect(document.title).toBe('Components · SOROUSH.DESIGN')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Component reference.'
    )
  })

  it('non-hydration: skips createRoot on subsequent CSR calls', async () => {
    await onRenderClient({ isHydration: false } as never)
    expect(createRoot).not.toHaveBeenCalled()
  })
})
