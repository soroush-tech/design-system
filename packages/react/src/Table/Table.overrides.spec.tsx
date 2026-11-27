import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { lastColor, overrides } from '../utils/test/overrides'
import { mark } from '../utils/test/slotMark'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TablePaginationActions,
  TableRow,
  TableSortLabel,
} from './'

const rootProps = {
  'data-testid': 'target',
  className: 'own',
  style: [false, null, undefined, overrides.second],
  slotProps: { root: { ...mark('root'), className: 'c-root' } },
}

const pagination = {
  count: 30,
  page: 0,
  rowsPerPage: 10,
  onPageChange: () => {},
  getItemAriaLabel: (type: string) => type,
}

const roots: Array<[string, (props: object) => ReactElement]> = [
  ['Table', (props) => <Table {...props} />],
  ['TableBody', (props) => <TableBody {...props} />],
  ['TableCell', (props) => <TableCell {...props} />],
  ['TableContainer', (props) => <TableContainer {...props} />],
  ['TableFooter', (props) => <TableFooter {...props} />],
  ['TableHead', (props) => <TableHead {...props} />],
  ['TablePagination', (props) => <TablePagination {...pagination} {...props} />],
  ['TablePaginationActions', (props) => <TablePaginationActions {...pagination} {...props} />],
  ['TableRow', (props) => <TableRow {...props} />],
  ['TableSortLabel', (props) => <TableSortLabel {...props} />],
]

describe('the root of the Table components takes style and slotProps.root', () => {
  it.each(roots)(
    '%s: the style prop wins over slotProps.root.style, and the classes join',
    (_, view) => {
      renderWithTheme(view(rootProps))
      const target = screen.getByTestId('target')
      expect(target).toHaveClass('c-root', 'own')
      expect(target).toHaveAttribute('data-mark', 'root')
      expect(target).toHaveAttribute('aria-description', 'root')
      expect(lastColor(target)).toBe('rgb(4, 5, 6)')
    }
  )

  it.each(roots)('%s: slotProps.root.style alone is applied', (_, view) => {
    renderWithTheme(view({ 'data-testid': 'target', slotProps: { root: mark('root') } }))
    expect(lastColor(screen.getByTestId('target'))).toBe('rgb(1, 2, 3)')
  })
})

describe('the slots of TableSortLabel', () => {
  it('puts the icon slot on the arrow, keeping its own class', () => {
    const { container } = renderWithTheme(
      <TableSortLabel iconProps={{ style: overrides.first }} slotProps={{ icon: mark('icon') }}>
        Name
      </TableSortLabel>
    )
    const icon = container.querySelector('.sort-icon') as HTMLElement
    expect(icon).toHaveClass('c-icon', 'sort-icon')
    expect(icon).toHaveAttribute('data-mark', 'icon')
    expect(lastColor(icon)).toBe('rgb(1, 2, 3)')
  })

  it('takes the style of iconProps when the icon slot has none', () => {
    const { container } = renderWithTheme(
      <TableSortLabel iconProps={{ style: overrides.second }}>Name</TableSortLabel>
    )
    expect(lastColor(container.querySelector('.sort-icon') as HTMLElement)).toBe('rgb(4, 5, 6)')
  })
})
