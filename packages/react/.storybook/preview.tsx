import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '@gild-ui/react/ThemeProvider'
import { baseTheme, type Theme } from '@gild-ui/core/theme'
import { Global } from '@gild-ui/react/Global'
import { globalStyles } from '@gild-ui/react/engine'
import { css } from '@gild-ui/react/css'

// Font-family is consumer policy, not part of the package's reset - the site loads the
// webfonts itself. Here only the family is applied, so text falls back to the generic
// stack in `theme.fonts`, which is exactly what an unstyled consumer gets.
const fontFamily = (theme: Theme) => css`
  html {
    font-family: ${theme.fonts.body};
  }
`

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={baseTheme}>
        <Global styles={[fontFamily, globalStyles]} />
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
