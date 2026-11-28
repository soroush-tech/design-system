import { describe, it, expect } from 'vitest'
import { findRowByText, getRowText } from './findRowByText'

const row = (label: string, { isDisabled = false, shortcut = '' } = {}) => {
  const element = document.createElement('li')
  element.innerHTML = `<span data-menu-label>${label}</span><span>${shortcut}</span>`
  if (isDisabled) element.setAttribute('aria-disabled', 'true')
  return element
}

describe('getRowText', () => {
  it('reads the label only, not the shortcut, lower-cased and trimmed', () => {
    expect(getRowText(row(' Rename ', { shortcut: 'F2' }))).toBe('rename')
  })

  it('falls back to the whole row without a label slot', () => {
    const element = document.createElement('li')
    element.textContent = 'Plain'
    expect(getRowText(element)).toBe('plain')
  })

  it('reads an empty row as empty', () => {
    expect(getRowText(document.createElement('li'))).toBe('')
  })
})

describe('findRowByText', () => {
  const redo = row('Redo')
  const rename = row('Rename')
  const reload = row('Reload', { isDisabled: true })
  const run = row('Run')
  const rows = [redo, rename, reload, run]

  it('cycles through the rows starting with a repeated key, skipping disabled ones', () => {
    expect(findRowByText(rows, null, 'r')).toBe(redo)
    expect(findRowByText(rows, redo, 'r')).toBe(rename)
    expect(findRowByText(rows, rename, 'rr')).toBe(run)
    expect(findRowByText(rows, run, 'rrr')).toBe(redo)
  })

  it('matches a typed prefix from the current row onward', () => {
    expect(findRowByText(rows, redo, 're')).toBe(redo)
    expect(findRowByText(rows, redo, 'ren')).toBe(rename)
    expect(findRowByText(rows, null, 'ru')).toBe(run)
  })

  it('is case-insensitive and finds nothing without a match', () => {
    expect(findRowByText(rows, null, 'RU')).toBe(run)
    expect(findRowByText(rows, null, 'x')).toBeUndefined()
  })
})
