import { useMemo } from 'react'
import { Editor } from 'react-live'
import { styled } from '@soroush.tech/design-system'
import { useTheme } from '@soroush.tech/design-system/theme'
import { prismTheme } from '../../utils/prismTheme'

export interface CodePanelProps {
  /** The demo source to display. */
  code: string
  /** Sets the highlighting language so it matches the toggle. */
  language: 'ts' | 'js'
}

/**
 * The read-only code panel: react-live's own editor, switched off - the live editor's very
 * markup and highlighting, so a demo turning live doesn't change its code's size. Only the
 * editor is imported; react-live's evaluator stays in the lazily loaded `LiveCode`.
 */
// What the editable editor sets on its element, set here too: long lines wrap alike, and a tab
// is as wide - a read-only and a live panel of the same code are one size.
const ReadOnlyEditor = styled('div', { name: 'StoryDemo', slot: 'codePanel', label: 'CodePanel' })({
  '& pre': { whiteSpace: 'pre-wrap', tabSize: 2 },
})

export function CodePanel({ code, language }: Readonly<CodePanelProps>) {
  const theme = useTheme()
  const editorTheme = useMemo(() => prismTheme(theme.syntax!), [theme])
  return (
    <ReadOnlyEditor>
      <Editor
        code={code}
        language={language === 'ts' ? 'tsx' : 'jsx'}
        theme={editorTheme}
        disabled
      />
    </ReadOnlyEditor>
  )
}
