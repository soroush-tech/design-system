import { describe, it, expect, afterEach, vi } from 'vitest'
import { installPopover } from './installPopover'

let restore = () => {}
afterEach(() => {
  restore()
  document.body.innerHTML = ''
})

const popover = (kind = 'auto') => {
  const element = document.createElement('div')
  element.id = 'menu'
  element.setAttribute('popover', kind)
  document.body.append(element)
  return element
}

const button = (action?: string) => {
  const element = document.createElement('button')
  element.setAttribute('popovertarget', 'menu')
  if (action) element.setAttribute('popovertargetaction', action)
  element.append(document.createElement('span'))
  document.body.append(element)
  return element
}

const toggles = (element: HTMLElement) => {
  const states: string[] = []
  element.addEventListener('toggle', (event) => states.push((event as ToggleEvent).newState))
  return states
}

describe('installPopover', () => {
  it('adds show / hide / toggle where jsdom has none, firing toggle with the new state', () => {
    expect(HTMLElement.prototype.showPopover).toBeUndefined()
    restore = installPopover()
    const element = popover()
    const states = toggles(element)
    element.showPopover()
    element.showPopover()
    element.hidePopover()
    expect(element.togglePopover()).toBe(true)
    expect(element.togglePopover(false)).toBe(false)
    expect(element.togglePopover({ force: true })).toBe(true)
    expect(element.togglePopover({})).toBe(false)
    // An unchanged state fires nothing, as in a browser.
    expect(states).toEqual(['open', 'closed', 'open', 'closed', 'open', 'closed'])
  })

  it('hides a closed popover the way the browser does', () => {
    restore = installPopover()
    const element = popover()
    expect(element).not.toBeVisible()
    element.showPopover()
    expect(element).toBeVisible()
  })

  it('closes open auto popovers on Escape, and leaves manual ones open', () => {
    restore = installPopover()
    const auto = popover()
    const manual = popover('manual')
    auto.showPopover()
    manual.showPopover()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(auto).toBeVisible()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(auto).not.toBeVisible()
    expect(manual).toBeVisible()
  })

  it.each([
    [undefined, [true, false]],
    ['show', [true, true]],
    ['hide', [false, false]],
  ] as const)('acts on its target from a popovertarget button (action %s)', (action, expected) => {
    restore = installPopover()
    const element = popover()
    if (action === 'hide') element.showPopover()
    const trigger = button(action)
    const open = () => element.hasAttribute('data-popover-open')
    trigger.firstElementChild!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    const first = open()
    trigger.click()
    expect([first, open()]).toEqual(expected)
  })

  it('ignores clicks outside popovertarget buttons and buttons without a popover target', () => {
    restore = installPopover()
    const element = popover()
    element.removeAttribute('popover')
    const states = toggles(element)
    document.body.click()
    expect(() => document.dispatchEvent(new MouseEvent('click', { bubbles: true }))).not.toThrow()
    button().click()
    expect(states).toEqual([])
  })

  it('does nothing where the real API exists, and restore removes the stand-in', () => {
    restore = installPopover()
    const keepNative = installPopover()
    keepNative()
    expect(typeof HTMLElement.prototype.showPopover).toBe('function')
    restore()
    restore = () => {}
    expect(HTMLElement.prototype.showPopover).toBeUndefined()
    expect(document.querySelectorAll('style')).toHaveLength(0)
    const listener = vi.fn()
    const element = popover()
    element.addEventListener('toggle', listener)
    button().click()
    expect(listener).not.toHaveBeenCalled()
  })
})
