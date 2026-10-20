import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { Tab } from '../Tab'
import { TabList } from '../TabList'
import { TabContext } from '../TabContext'
import { ThemeProvider } from '../../theme'
import type { ReactNode } from 'react'
import { TabPanel } from './TabPanel'

const renderPanels = (shouldKeepMounted = false) =>
  renderWithTheme(
    <TabContext defaultValue="a">
      <TabList>
        <Tab value="a" label="A" />
        <Tab value="b" label="B" />
      </TabList>
      <TabPanel value="a" data-testid="panel-a" className="p" p={2}>
        Panel A
      </TabPanel>
      <TabPanel value="b" data-testid="panel-b" shouldKeepMounted={shouldKeepMounted}>
        Panel B
      </TabPanel>
    </TabContext>
  )

describe('TabPanel', () => {
  it('is a focusable tabpanel named by its tab, shown while its tab is selected', () => {
    renderPanels()
    const panel = screen.getByRole('tabpanel', { name: 'A' })
    expect(panel).toHaveAttribute('tabindex', '0')
    expect(panel).toHaveClass('p')
    expect(panel).toHaveStyle({ padding: baseTheme.space[2] })
    const hidden = screen.getByTestId('panel-b')
    expect(hidden).not.toBeVisible()
    expect(hidden).toBeEmptyDOMElement()
  })

  it('keeps hidden content mounted with shouldKeepMounted', () => {
    renderPanels(true)
    expect(screen.getByTestId('panel-b')).toHaveTextContent('Panel B')
    expect(screen.getByTestId('panel-b')).not.toBeVisible()
  })

  it('throws outside a TabContext', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<TabPanel value="a">x</TabPanel>)).toThrow(
      'A TabPanel must be inside a TabContext.'
    )
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('TabPanel ground', () => {
  it('takes bg from theme.background, to match its tab', () => {
    renderWithTheme(
      <TabContext defaultValue="a">
        <TabList>
          <Tab value="a" label="A" />
        </TabList>
        <TabPanel value="a" bg="paper" data-testid="panel">
          Panel A
        </TabPanel>
      </TabContext>
    )
    expect(screen.getByTestId('panel')).toHaveStyle({ backgroundColor: baseTheme.background.paper })
  })
})

describe('TabPanel theme defaults', () => {
  it('keeps hidden content mounted when theme.components.TabPanel.defaultProps says so', () => {
    const theme = createTheme(baseTheme, {
      components: { TabPanel: { defaultProps: { shouldKeepMounted: true } } },
    })
    renderWithTheme(
      <TabContext defaultValue="a">
        <TabList>
          <Tab value="a" label="A" />
          <Tab value="b" label="B" />
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </TabContext>,
      { wrapper: withTheme(theme) }
    )
    expect(screen.getByText('Panel B')).not.toBeVisible()
  })
})
