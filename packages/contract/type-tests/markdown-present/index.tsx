// With any markdown entry imported, its slots and keys are typed - one block, loaded by every entry.
import '@soroush.design/react-markdown/Preview'
import type { ThemeComponents } from '@soroush.design/react'
import { useTheme } from '@soroush.design/react/useTheme'

export const components = {
  MarkdownEditor: { styleOverrides: { root: { padding: 8 } } },
  CodeBlock: { styleOverrides: { surface: { borderRadius: 4 } } },
} satisfies ThemeComponents

export const Screen = () => {
  const theme = useTheme()
  const keyword: string | undefined = theme.syntax?.keyword
  return <>{keyword}</>
}
