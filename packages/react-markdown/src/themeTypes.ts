import type { ThemeSyntax } from './CodeBlock/CodeBlock.data'

/**
 * Per-theme overrides for the `Mermaid` renderer, merged over (and winning against) its default
 * mermaid `themeVariables`. Common variables are listed for autocomplete; any other mermaid theme
 * variable is accepted. Set via `theme.mermaid` (e.g. `createTheme(baseTheme, { mermaid: ... })`).
 */
export interface MermaidThemeVariables {
  darkMode?: boolean
  background?: string
  fontFamily?: string
  fontSize?: string
  primaryColor?: string
  primaryTextColor?: string
  primaryBorderColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  lineColor?: string
  textColor?: string
  mainBkg?: string
  noteBkgColor?: string
  noteTextColor?: string
  [variable: string]: string | number | boolean | undefined
}

// This package renders through Gild UI's `styled`, so its named roots (`MarkdownEditor`,
// `MarkdownPreview`, `MarkdownToolbar`, `CodeBlock`) resolve `theme.components` at run time. One
// block registers their slots on `@gild-ui/react`'s `ThemeComponents` and the two theme keys
// on the core's `Theme`; every entry of this package imports this file, so an app that imports any
// of them has `theme.components.MarkdownPreview` and `theme.syntax` typed. `ComponentConfig` comes
// in through an inline `import(...)` type, so nothing reads as unused under an app's
// `noUnusedLocals`, which ignores usage inside `declare module`.
declare module '@gild-ui/react' {
  interface ThemeComponents {
    MarkdownEditor?: import('@gild-ui/react').ComponentConfig
    MarkdownLiveEdit?: import('@gild-ui/react').ComponentConfig<
      Record<string, unknown>,
      'root' | 'block'
    >
    MarkdownPreview?: import('@gild-ui/react').ComponentConfig
    MarkdownToolbar?: import('@gild-ui/react').ComponentConfig<
      Record<string, unknown>,
      'root' | 'strike' | 'tablePickerCell'
    >
    CodeBlock?: import('@gild-ui/react').ComponentConfig<
      Record<string, unknown>,
      'root' | 'surface'
    >
  }
}

declare module '@gild-ui/core/theme' {
  interface Theme {
    /** Per-theme overrides for the `Mermaid` renderer's mermaid `themeVariables`. */
    mermaid?: MermaidThemeVariables
    /**
     * Syntax-highlighting tokens for `CodeBlock` - see `syntaxDark`/`syntaxLight`. Optional
     * only so `design-system`'s own `baseTheme` literal still satisfies `Theme` in this
     * monorepo's source-consuming builds; `CodeBlock` requires it in practice (no fallback).
     */
    syntax?: ThemeSyntax
  }
}
