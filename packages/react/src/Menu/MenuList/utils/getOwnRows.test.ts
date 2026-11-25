import { describe, it, expect } from 'vitest'
import { getOwnRows, isRowEnabled } from './getOwnRows'

const build = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.querySelector<HTMLElement>('[role="menu"]')!
}

describe('getOwnRows', () => {
  it('finds every row role of the list, in order', () => {
    const list = build(`
      <ul role="menu">
        <li role="menuitem">A</li>
        <li role="separator"></li>
        <li role="menuitemradio">B</li>
        <li role="menuitemcheckbox">C</li>
      </ul>`)
    expect(getOwnRows(list).map((row) => row.textContent)).toEqual(['A', 'B', 'C'])
  })

  it("leaves out a nested submenu's rows", () => {
    const list = build(`
      <ul role="menu">
        <li role="none">
          <div role="menuitem">Parent</div>
          <ul role="menu"><li role="menuitem">Child</li></ul>
        </li>
        <li role="menuitem">Sibling</li>
      </ul>`)
    expect(getOwnRows(list).map((row) => row.textContent)).toEqual(['Parent', 'Sibling'])
  })
})

describe('isRowEnabled', () => {
  it('is false only for aria-disabled="true"', () => {
    const row = document.createElement('li')
    expect(isRowEnabled(row)).toBe(true)
    row.setAttribute('aria-disabled', 'false')
    expect(isRowEnabled(row)).toBe(true)
    row.setAttribute('aria-disabled', 'true')
    expect(isRowEnabled(row)).toBe(false)
  })
})
