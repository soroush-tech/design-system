import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { View } from '../View'
import { Flex } from './'

// The span width is a calc over the parent's custom properties - only a real layout engine
// resolves it.

describe('span in a Flex (real layout)', () => {
  it('takes N columns and the gutters between them in a Flex layout', () => {
    renderWithTheme(
      <Flex layout width="800px" data-testid="row">
        <View span={2} data-testid="cell">
          cell
        </View>
      </Flex>
    )
    const row = document.querySelector('[data-testid="row"]') as HTMLElement
    const cell = document.querySelector('[data-testid="cell"]') as HTMLElement
    const style = getComputedStyle(row)
    const columns = Number(style.getPropertyValue('--layout-columns'))
    const gutter = Number.parseFloat(style.getPropertyValue('--layout-gutter'))
    const content = row.clientWidth - Number.parseFloat(style.paddingLeft) * 2
    const column = (content - (columns - 1) * gutter) / columns
    expect(cell.getBoundingClientRect().width).toBeCloseTo(column * 2 + gutter, 0)
  })

  it('does nothing in a Flex without layout', () => {
    renderWithTheme(
      <Flex flexDirection="row" width="400px">
        <View span={6} data-testid="cell">
          cell
        </View>
      </Flex>
    )
    const cell = document.querySelector('[data-testid="cell"]') as HTMLElement
    expect(cell.getBoundingClientRect().width).toBeLessThan(400)
  })
})
