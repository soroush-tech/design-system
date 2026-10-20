import { Fragment, useCallback, useMemo, type ReactNode } from 'react'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import { useTheme } from '@soroush.tech/design-system/theme'
import { prepareLiveCode } from '../../utils/prepareLiveCode'
import { snippetToModule } from '../../utils/snippetToModule'
import { prismTheme } from '../../utils/prismTheme'
import { DemoFrame } from '../DemoFrame'
import { TrackedEditor } from '../TrackedEditor'

export interface LiveCodeProps {
  /** The visible editor buffer - the collapsed snippet or the full module. */
  code: string
  language: 'ts' | 'js'
  /** Identifiers available to the evaluated code - imports are inert at runtime. */
  scope: Record<string, unknown>
  /** Helper declarations hidden by the collapsed view, injected for evaluation. */
  helpersText: string
  /** Fired with the current buffer on every edit. */
  onCodeChange: (code: string) => void
  /** The action row (and controls), rendered between the live preview and the editor. */
  toolbar?: ReactNode
}

/**
 * The always-live demo body: react-live evaluates the buffer on every keystroke and
 * renders it on the demo surface, with errors surfaced inline. A collapsed buffer is
 * completed into a module (hidden helpers included) before evaluation; import lines
 * are stripped - components resolve from the fixed scope instead.
 */
export function LiveCode({
  code,
  language,
  scope,
  helpersText,
  onCodeChange,
  toolbar,
}: Readonly<LiveCodeProps>) {
  const theme = useTheme()
  const editorTheme = useMemo(() => prismTheme(theme.syntax!), [theme])
  // Referentially stable: LiveProvider re-transpiles its pristine `code` prop whenever
  // transformCode changes identity, which would overwrite every keystroke's evaluation.
  const transformCode = useCallback(
    (buffer: string) => prepareLiveCode(snippetToModule(buffer, { importsText: '', helpersText })),
    [helpersText]
  )
  return (
    <LiveProvider
      code={code}
      language={language === 'ts' ? 'tsx' : 'jsx'}
      scope={scope}
      noInline
      transformCode={transformCode}
      theme={editorTheme}
    >
      <DemoFrame
        // No wrapper of its own: the demo sits straight on the surface, as the read-only one does.
        preview={<LivePreview Component={Fragment} />}
        error={<LiveError style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }} />}
        toolbar={toolbar}
        code={<TrackedEditor onCodeChange={onCodeChange} />}
      />
    </LiveProvider>
  )
}
