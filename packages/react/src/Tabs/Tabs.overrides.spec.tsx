import { describe, it, expect, vi, afterEach } from 'vitest'
import type { ReactElement } from 'react'
import { act, createEvent, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { lastColor, overrides } from '../utils/test/overrides'
import { getStyleRulesFor } from '../utils/test/getStyleRulesFor'
import { mark } from '../utils/test/slotMark'
import { Tab } from './Tab'
import { TabContext } from './TabContext'
import { TabList } from './TabList'
import { TabPanel } from './TabPanel'
import { TabScrollButton } from './TabScrollButton'
import { Tabs } from './Tabs'

afterEach(() => {
  vi.restoreAllMocks()
})

const rootProps = {
  'data-testid': 'target',
  className: 'own',
  style: [false, null, undefined, overrides.second],
  slotProps: { root: mark('root') },
}

const inTabs = (tab: ReactElement) => <Tabs defaultValue="a">{tab}</Tabs>

const roots: Array<[string, (props: object) => ReactElement]> = [
  ['Tabs', (props) => <Tabs {...props} />],
  [
    'TabList',
    (props) => (
      <TabContext defaultValue="a">
        <TabList {...props} />
      </TabContext>
    ),
  ],
  [
    'TabPanel',
    (props) => (
      <TabContext defaultValue="a">
        <TabPanel value="a" {...props} />
      </TabContext>
    ),
  ],
  ['TabScrollButton', (props) => <TabScrollButton direction="start" {...props} />],
]

describe('the root of the Tabs components takes style and slotProps.root', () => {
  it.each(roots)(
    '%s: the style prop wins over slotProps.root.style, and the classes join',
    (_, view) => {
      renderWithTheme(view(rootProps))
      const target = screen.getByTestId('target')
      expect(target).toHaveClass('c-root', 'own')
      expect(target).toHaveAttribute('data-mark', 'root')
      expect(lastColor(target)).toBe('rgb(4, 5, 6)')
    }
  )

  it.each(roots)('%s: slotProps.root.style alone is applied', (_, view) => {
    renderWithTheme(view({ 'data-testid': 'target', slotProps: { root: mark('root') } }))
    expect(lastColor(screen.getByTestId('target'))).toBe('rgb(1, 2, 3)')
  })

  it('Tab: puts style, className and slotProps.root on the box, the style prop winning', () => {
    renderWithTheme(
      inTabs(
        <Tab
          value="a"
          label="One"
          className="own"
          style={overrides.second}
          slotProps={{ root: mark('root') }}
        />
      )
    )
    const box = screen.getByRole('tab').parentElement as HTMLElement
    expect(box).toHaveClass('c-root', 'own')
    expect(box).toHaveAttribute('data-mark', 'root')
    expect(lastColor(box)).toBe('rgb(4, 5, 6)')
  })
})

const expectMarked = (element: Element | null, slot: string) => {
  expect(element).not.toBeNull()
  expect(element).toHaveClass(`c-${slot}`)
  expect(element).toHaveAttribute('data-mark', slot)
  expect(element).toHaveAttribute('aria-description', slot)
  // The slot's own rules may set a colour too, and sit later in the sheet: the entry's rule is what counts.
  expect(getStyleRulesFor(element as Element).map((rule) => rule.style.color)).toContain(
    'rgb(1, 2, 3)'
  )
}

const bySlot = (slot: string) => document.querySelector(`[data-mark="${slot}"]`)

describe('the slots of Tab', () => {
  it('puts each slot on its element', () => {
    renderWithTheme(
      inTabs(
        <Tab
          value="a"
          label="One"
          icon={<i />}
          closeLabel="Close one"
          secondaryAction={<b />}
          slotProps={{
            label: mark('label'),
            icon: mark('icon'),
            secondaryAction: mark('secondaryAction'),
            close: mark('close'),
          }}
        />
      )
    )
    expectMarked(screen.getByRole('tab'), 'label')
    expectMarked(bySlot('icon'), 'icon')
    expect(bySlot('icon')).toHaveAttribute('aria-hidden', 'true')
    expectMarked(bySlot('secondaryAction'), 'secondaryAction')
    expectMarked(bySlot('close'), 'close')
  })
})

describe('the slots of Tabs', () => {
  it('puts the list, indicator and content slots on their elements', () => {
    renderWithTheme(
      <Tabs
        defaultValue="a"
        startContent="start"
        endContent="end"
        slotProps={{
          list: mark('list'),
          indicator: mark('indicator'),
          startContent: mark('startContent'),
          endContent: mark('endContent'),
        }}
      >
        <Tab value="a" label="One" />
      </Tabs>
    )
    expectMarked(screen.getByRole('tablist'), 'list')
    expectMarked(bySlot('indicator'), 'indicator')
    expectMarked(bySlot('startContent'), 'startContent')
    expectMarked(bySlot('endContent'), 'endContent')
  })

  it('puts the scrollButton slot on both scroll buttons', () => {
    renderWithTheme(
      <Tabs
        defaultValue="a"
        overflowBehavior="scroll"
        scrollButtons="always"
        slotProps={{ scrollButton: mark('scrollButton') }}
      >
        <Tab value="a" label="One" />
      </Tabs>
    )
    const buttons = document.querySelectorAll('[data-scroll-direction]')
    expect(buttons).toHaveLength(2)
    buttons.forEach((button) => expectMarked(button, 'scrollButton'))
  })

  it('puts the overflowButton and overflowClose slots on the menu button and its close buttons', () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(150)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 100,
    } as DOMRect)
    renderWithTheme(
      <Tabs
        defaultValue="a"
        overflowBehavior="menu"
        overflowLabel="More tabs"
        onTabClose={() => {}}
        slotProps={{
          overflowButton: mark('overflowButton'),
          overflowClose: mark('overflowClose'),
        }}
      >
        <Tab value="a" label="Alpha" />
        <Tab value="b" label="Beta" closeLabel="Close Beta" />
      </Tabs>
    )
    const list = screen.getByRole('tablist')
    act(() => {
      list.dispatchEvent(createEvent.scroll(list))
      window.dispatchEvent(new Event('resize'))
    })
    const button = screen.getByRole('button', { name: 'More tabs' })
    expectMarked(button, 'overflowButton')
    fireEvent.click(button)
    expectMarked(bySlot('overflowClose'), 'overflowClose')
  })
})
