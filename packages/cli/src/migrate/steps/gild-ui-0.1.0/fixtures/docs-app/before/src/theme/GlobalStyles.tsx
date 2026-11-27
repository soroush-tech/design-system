// Self-hosted webfonts, bundled by Vite and served from our own origin so they load within the
// CSP's `default-src 'self'`. Space Grotesk (body/heading) and JetBrains Mono (mono): variable
// `wght` axis - one file covers every weight, which also satisfies `font-synthesis: none` (no
// missing weights to synthesize).
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { css, type Theme } from '@soroush.tech/design-system'
import { Global, globalStyles } from '@soroush.tech/design-system/engine'

const globalLocalStyles = (theme: Theme) => css`
  html {
    font-family: ${theme.fonts.body};
  }

  #root {
    min-height: 100dvh;
  }

  /* A section a link brings to the top of the window stops below the sticky tab bar - and under the
     top bar, below the large breakpoint - not behind them. */
  main [id] {
    scroll-margin-top: 9rem;
  }

  ${theme.breakpoints.up('lg')} {
    main [id] {
      scroll-margin-top: 5rem;
    }
  }
`

// This app's own global CSS - brand font-family and #root sizing. Rendered inside
// ThemeProvider so styles resolve against the active brand theme. The package's own
// `globalStyles` (box-sizing/margin/table resets, theme-driven body colors) composes
// alongside it - that reset is shared, not this app's concern.
export const GlobalStyles = () => <Global styles={[globalLocalStyles, globalStyles]} />
