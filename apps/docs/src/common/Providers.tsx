import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from 'src/mdx/mdxComponents'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { GlobalStyles } from 'src/theme/GlobalStyles'

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeModeProvider>
      <GlobalStyles />
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </ThemeModeProvider>
  )
}
