import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@gild-ui/react/utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/describeRootSlot'
import { Preview } from './Preview'

describeRootSlot(
  'Preview',
  (props) => <Preview {...props}>{'text'}</Preview>,
  () => screen.getByText('text').closest('[class*="MarkdownPreview"]') as HTMLElement
)

describe('Preview table alignment', () => {
  it('reads the alignment of a GFM column as the align of its cells, not as a style', () => {
    renderWithTheme(<Preview>{'| a | b |\n| - | -: |\n| 1 | 2 |'}</Preview>)
    const cell = screen.getByRole('cell', { name: '2' })
    expect(cell).toHaveStyle({ textAlign: 'right' })
    expect(cell).not.toHaveAttribute('style')
  })
})
