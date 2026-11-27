import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { catalog } from '@gild-ui/core/catalog'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { SlotsTable } from './SlotsTable'

describe('SlotsTable', () => {
  it('lists the slots the catalog gives a component', () => {
    renderWithTheme(<SlotsTable name="Tooltip" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Slots' })).toBeInTheDocument()
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows.map((row) => row.textContent)).toEqual(catalog.components.Tooltip.slots)
  })

  it('draws nothing for a name the catalog does not have', () => {
    const { container } = renderWithTheme(<SlotsTable name="Nothing" />)
    expect(container).toBeEmptyDOMElement()
  })
})
