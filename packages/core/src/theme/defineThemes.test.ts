import { describe, expect, it } from 'vitest'
import { baseTheme } from './baseTheme'
import { createTheme } from './createTheme'
import { defineThemes } from './defineThemes'

const brand = { main: '#0a7a5a', light: '#3d9b80', dark: '#075640', contrastText: '#ffffff' }

describe('defineThemes', () => {
  const light = createTheme(baseTheme, { palette: { brand } })
  const dark = createTheme(baseTheme, { palette: { brand } })
  const components = { Button: { defaultProps: { shape: 'pill' } } }
  const themes = defineThemes({ light, dark }, components)

  it('gives every theme the one components object', () => {
    expect(themes.light.components).toBe(components)
    expect(themes.dark.components).toBe(components)
    expect(Object.keys(themes)).toEqual(['light', 'dark'])
  })

  it('returns new objects and changes none of its arguments', () => {
    expect(themes.light).not.toBe(light)
    expect(themes.light.palette).toBe(light.palette)
    expect('components' in light).toBe(false)
    expect(components).toEqual({ Button: { defaultProps: { shape: 'pill' } } })
  })

  it('replaces the components a theme had', () => {
    const had = { ...light, components: { Tabs: {} } }
    expect(defineThemes({ had }, components).had.components).toBe(components)
  })

  it('types: the themes must share every key, and the message names the theme and the key', () => {
    // @ts-expect-error -- dark lacks the palette.brand that light has
    defineThemes({ light, dark: createTheme(baseTheme, {}) }, {})
    // @ts-expect-error -- light has a palette.brand that dark lacks
    defineThemes({ dark: createTheme(baseTheme, {}), light }, {})
    // @ts-expect-error -- components are not a createTheme override
    createTheme(baseTheme, { components: {} })
  })
})
