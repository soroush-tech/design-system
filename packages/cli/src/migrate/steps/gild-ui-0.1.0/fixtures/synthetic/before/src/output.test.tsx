import { describe, expect, it, vi } from 'vitest'
import { Button } from '@soroush.tech/design-system/Button'

vi.mock('@soroush.tech/design-system/Button', () => ({ Button: () => null }))
vi.mock('@soroush.tech/design-system/theme', () => ({ useTheme: () => ({}) }))
vi.doMock('@soroush.tech/design-system/Fancy', () => ({}))

describe('output', () => {
  it('reads the old output', () => {
    expect(document.querySelector('style[data-emotion]')).not.toBeNull()
    expect(document.querySelector('[class^="css-"]')).not.toBeNull()
    expect(document.body.innerHTML).toContain('css-1k2j3h4-Button')
    expect(Button).toBeDefined()
    expect(document.title).toBe('no css-in-js here')
  })
})
