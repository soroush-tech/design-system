// jsdom implements none of the HTML Popover API: no showPopover / hidePopover / togglePopover,
// no `toggle` event, no light dismiss, no popovertarget buttons and none of the browser's popover
// styles. This stands in for them in unit tests: the open state is a data attribute, a closed
// popover is hidden the way the browser hides it, Escape closes the open auto popovers, and a
// popovertarget button acts on its target. The top layer, outside clicks and focus stay with a
// real browser.
const OPEN = 'data-popover-open'

const setOpen = (element: HTMLElement, open: boolean) => {
  if (element.hasAttribute(OPEN) === open) return
  element.toggleAttribute(OPEN, open)
  // jsdom does not restyle on an attribute change, so the open state also goes inline.
  element.style.display = open ? 'block' : ''
  const [oldState, newState] = open ? ['closed', 'open'] : ['open', 'closed']
  element.dispatchEvent(Object.assign(new Event('toggle'), { oldState, newState }))
}

/**
 * @description Installs a Popover API stand-in on the test document - for jsdom, which has
 * none - so components built on HTML popovers (`Drawer`) open, close and fire `toggle` in unit
 * tests. Does nothing where the real API exists. Returns a function that removes it again.
 */
export function installPopover(): () => void {
  // The DOM types always declare the API; at runtime jsdom leaves it out.
  const proto: Partial<Pick<HTMLElement, 'showPopover' | 'hidePopover' | 'togglePopover'>> =
    HTMLElement.prototype
  if (typeof proto.showPopover === 'function') return () => {}

  proto.showPopover = function (this: HTMLElement) {
    setOpen(this, true)
  }
  proto.hidePopover = function (this: HTMLElement) {
    setOpen(this, false)
  }
  proto.togglePopover = function (this: HTMLElement, options?: boolean | { force?: boolean }) {
    const force = typeof options === 'boolean' ? options : options?.force
    const open = force ?? !this.hasAttribute(OPEN)
    setOpen(this, open)
    return open
  }

  const style = document.createElement('style')
  style.textContent = `[popover]:not([${OPEN}]) { display: none; }`
  document.head.append(style)

  // Light dismiss by Escape closes auto popovers; manual ones stay open.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return
    for (const element of document.querySelectorAll<HTMLElement>(
      `[popover]:not([popover="manual"])[${OPEN}]`
    )) {
      setOpen(element, false)
    }
  }
  const onClick = (event: MouseEvent) => {
    // A click dispatched on the document itself has no element to search from.
    if (!(event.target instanceof Element)) return
    const button = event.target.closest('[popovertarget]')
    const target = button && document.getElementById(button.getAttribute('popovertarget')!)
    if (!target?.hasAttribute('popover')) return
    const action = button!.getAttribute('popovertargetaction') ?? 'toggle'
    setOpen(target, action === 'toggle' ? !target.hasAttribute(OPEN) : action === 'show')
  }
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('click', onClick)

  return () => {
    delete proto.showPopover
    delete proto.hidePopover
    delete proto.togglePopover
    style.remove()
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('click', onClick)
  }
}
