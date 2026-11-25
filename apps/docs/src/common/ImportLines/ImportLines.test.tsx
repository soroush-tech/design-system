import { describe, it, expect } from 'vitest'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { allComponents, componentImportLine, hookImportLine } from 'src/common/nav'
import { ImportLines } from './ImportLines'

describe('ImportLines', () => {
  it('shows the install and the import of a component', () => {
    const button = allComponents.find((item) => item.name === 'Button')!
    const { container } = renderWithTheme(<ImportLines line={componentImportLine(button)} />)
    expect(container.textContent).toContain('npm i @soroush.design/react')
    expect(container.textContent).toContain("import { Button } from '@soroush.design/react/Button'")
  })

  it('shows the hooks library for a hook', () => {
    const { container } = renderWithTheme(<ImportLines line={hookImportLine('useDebounce')} />)
    expect(container.textContent).toContain('npm i @soroush.design/react-hooks')
  })
})
