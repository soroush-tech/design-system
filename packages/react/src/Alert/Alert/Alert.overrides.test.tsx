import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { getStyleRulesFor } from '../../utils/test/getStyleRulesFor'
import { overrides } from '../../utils/test/overrides'
import { Alert, type AlertProps } from './Alert'

const mark = (name: string) => ({
  className: `mark-${name}`,
  style: overrides.first,
  'data-mark': name,
  'aria-description': name,
})
const hasColor = (element: Element, color: string) =>
  getStyleRulesFor(element).some((rule) => rule.style.color === color)
const at = (name: string) => document.querySelector(`[data-mark="${name}"]`) as HTMLElement

const view = (props: Partial<AlertProps> = {}) => (
  <Alert onClose={() => {}} closeLabel="Close" action={<b>Undo</b>} {...props}>
    Saved
  </Alert>
)

describe('Alert overrides', () => {
  it.each(['root', 'icon', 'message', 'action', 'closeButton'])(
    'puts the style, class name and attributes of slotProps.%s on that slot',
    (slot) => {
      renderWithTheme(
        view({
          slotProps: {
            root: mark('root'),
            icon: mark('icon'),
            message: mark('message'),
            action: mark('action'),
            closeButton: mark('closeButton'),
          },
        })
      )
      const element = at(slot)
      expect(element).toHaveClass(`mark-${slot}`)
      expect(element).toHaveAttribute('aria-description', slot)
      expect(hasColor(element, 'rgb(1, 2, 3)')).toBe(true)
    }
  )

  it('lets style win over slotProps.root.style, and joins the class names', () => {
    renderWithTheme(
      view({
        className: 'own',
        style: [false, null, overrides.second, undefined],
        slotProps: { root: mark('root') },
      })
    )
    expect(at('root')).toHaveClass('mark-root', 'own')
    expect(hasColor(at('root'), 'rgb(4, 5, 6)')).toBe(true)
    expect(hasColor(at('root'), 'rgb(1, 2, 3)')).toBe(false)
  })
})
