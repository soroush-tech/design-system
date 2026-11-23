import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Tab } from '../Tab'
import { TabList } from '../TabList'
import { TabPanel } from '../TabPanel'
import { Tabs } from '../Tabs'
import { TabContext } from './TabContext'

const tab = (name: string) => screen.getByRole('tab', { name })

describe('TabContext', () => {
  const renderLinked = (
    props: { onChange?: (value: string | number) => void; value?: string } = {}
  ) =>
    renderWithTheme(
      <TabContext defaultValue="canvas" {...props}>
        <TabList aria-label="Views">
          <Tab value="canvas" label="Canvas" />
          <Tab value="system" label="Design system" />
        </TabList>
        <TabPanel value="canvas">The canvas</TabPanel>
        <TabPanel value="system">The system</TabPanel>
      </TabContext>
    )

  it('links each tab of its TabList to its panel, and shows the selected one', () => {
    renderLinked()
    const panel = screen.getByRole('tabpanel', { name: 'Canvas' })
    expect(tab('Canvas')).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveTextContent('The canvas')
    expect(screen.queryByText('The system')).not.toBeInTheDocument()
  })

  it('switches panels when a tab is chosen, and reports it', () => {
    const onChange = vi.fn()
    renderLinked({ onChange })
    fireEvent.click(tab('Design system'))
    expect(onChange).toHaveBeenCalledWith('system')
    expect(screen.getByRole('tabpanel', { name: 'Design system' })).toHaveTextContent('The system')
  })

  it('in controlled mode, leaves the value to its owner', () => {
    const onChange = vi.fn()
    renderLinked({ value: 'system', onChange })
    fireEvent.click(tab('Canvas'))
    expect(onChange).toHaveBeenCalledWith('canvas')
    expect(tab('Design system')).toHaveAttribute('aria-selected', 'true')
  })

  it('starts with nothing selected without a defaultValue', () => {
    renderWithTheme(
      <TabContext>
        <TabList>
          <Tab value="a" label="A" />
        </TabList>
      </TabContext>
    )
    expect(tab('A')).toHaveAttribute('aria-selected', 'false')
  })

  it('leaves a plain Tabs inside it alone - only a TabList takes its value', () => {
    renderWithTheme(
      <TabContext defaultValue="a">
        <Tabs defaultValue="b">
          <Tab value="a" label="A" />
          <Tab value="b" label="B" />
        </Tabs>
      </TabContext>
    )
    expect(tab('B')).toHaveAttribute('aria-selected', 'true')
    expect(tab('B')).not.toHaveAttribute('aria-controls')
  })
})
