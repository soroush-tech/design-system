import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Tab } from '../Tab'
import { TabContext } from '../TabContext'
import { TabPanel } from '../TabPanel'
import { TabList } from './TabList'

const tab = (name: string) => screen.getByRole('tab', { name })

describe('TabList', () => {
  it("shows its TabContext's value, and reports a choice both to it and to its own onChange", () => {
    const onContextChange = vi.fn()
    const onChange = vi.fn()
    renderWithTheme(
      <TabContext defaultValue="one" onChange={onContextChange}>
        <TabList aria-label="Items" onChange={onChange} variant="boxed">
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
        </TabList>
        <TabPanel value="one">First</TabPanel>
        <TabPanel value="two">Second</TabPanel>
      </TabContext>
    )
    expect(screen.getByRole('tablist', { name: 'Items' })).toBeInTheDocument()
    expect(tab('Item One')).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(tab('Item Two'))
    expect(onContextChange).toHaveBeenCalledWith('two')
    expect(onChange).toHaveBeenCalledWith('two')
    expect(screen.getByRole('tabpanel', { name: 'Item Two' })).toHaveTextContent('Second')
  })

  it('names the tab its panel is labelled by', () => {
    renderWithTheme(
      <TabContext defaultValue="one">
        <TabList>
          <Tab value="one" label="Item One" />
        </TabList>
        <TabPanel value="one">First</TabPanel>
      </TabContext>
    )
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tab('Item One').id)
  })

  it('needs a TabContext', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      renderWithTheme(
        <TabList>
          <Tab label="Alone" />
        </TabList>
      )
    ).toThrow('A TabList must be inside a TabContext.')
  })
})
