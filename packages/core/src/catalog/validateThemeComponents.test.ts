import { describe, expect, it } from 'vitest'
import { catalog, validateThemeComponents } from './index'
import { themeComponents } from './themeComponents'

const messages = (components: unknown) => validateThemeComponents(components).map((p) => p.message)

describe('validateThemeComponents', () => {
  it('finds nothing wrong in a correct theme, or in no components', () => {
    expect(
      validateThemeComponents({
        Button: {
          defaultProps: { shape: 'pill', size: 'sm' },
          styleOverrides: { root: { opacity: 1 } },
          variants: [{ props: { variant: 'dashed' }, style: {} }],
        },
      })
    ).toEqual([])
    expect(validateThemeComponents(undefined)).toEqual([])
    expect(validateThemeComponents({ Button: undefined })).toEqual([])
  })

  it('names a component the design system lacks', () => {
    const [message] = messages({ Buton: {} })
    expect(message).toMatch(/^components\.Buton is not a component \(Accordion, /)
  })

  it('names a slot the component lacks, with the slots it has', () => {
    expect(
      validateThemeComponents({ Tabs: { styleOverrides: { root: {}, indicater: {} } } })
    ).toEqual([
      {
        path: 'components.Tabs.styleOverrides.indicater',
        message:
          'components.Tabs.styleOverrides.indicater is not a slot of Tabs (root, list, indicator, startContent, endContent, scrollButton, overflowButton, overflowClose)',
      },
    ])
  })

  it('names a default prop the component does not take, and a look prop it does not take', () => {
    expect(
      messages({
        Tabs: {
          defaultProps: { variant: 'boxed', colour: 'primary' },
          variants: [{ props: { variant: 'pill', fullwidth: true }, style: {} }],
        },
      })
    ).toEqual([
      expect.stringMatching(
        /^components\.Tabs\.defaultProps\.colour is not a prop of Tabs \(variant, /
      ),
      expect.stringMatching(
        /^components\.Tabs\.variants\[0\]\.props\.fullwidth is not a prop of Tabs \(variant, /
      ),
    ])
  })

  it('names a default value outside the values the catalog lists', () => {
    expect(messages({ Button: { defaultProps: { shape: 'squre' } } })).toEqual([
      'components.Button.defaultProps.shape is "squre", not one of square, rounded, pill',
    ])
  })

  it('accepts a default that names a look the theme defines itself', () => {
    expect(
      validateThemeComponents({
        Tabs: {
          defaultProps: { variant: 'pill' },
          variants: [{ props: { variant: 'pill' }, style: {} }],
        },
      })
    ).toEqual([])
  })

  it('reads no fields of a component whose owner state is open, and ignores what is not an object', () => {
    expect(
      validateThemeComponents({
        Flex: { defaultProps: { anything: 1 }, variants: [{ props: { whatever: 1 } }, 'x'] },
        Tabs: { styleOverrides: 'x', defaultProps: 'x', variants: 'x' },
      })
    ).toEqual([])
  })
})

describe('the catalog entries', () => {
  it('carry the slots and owner-state fields of a component with a theme entry', () => {
    expect(catalog.components.Tabs.slots).toContain('indicator')
    expect(catalog.components.Tabs.ownerState).toContain('fullWidth')
    expect(catalog.components.Fade.slots).toBeUndefined()
  })

  it('exist for every component a theme can customize', () => {
    expect(Object.keys(themeComponents).filter((name) => !(name in catalog.components))).toEqual([])
  })
})
