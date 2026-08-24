import { useCallback, useMemo, type ReactNode } from 'react'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import { useTheme } from '@soroush.tech/design-system/theme'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { prepareLiveCode } from '../../utils/prepareLiveCode'
import { snippetToModule } from '../../utils/snippetToModule'
import { prismTheme } from '../../utils/prismTheme'
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
      <Flex
        p={5}
        bg="paper"
        borderRadius="md"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <LivePreview />
      </Flex>
      <Typography variant="caption" color="error" as="div" mt={1} px={2}>
        <LiveError style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }} />
      </Typography>
      {toolbar}
      <View px={2} pb={2}>
        <View
          bg="terminal"
          borderRadius="md"
          borderColor="light"
          borderWidth="thin"
          maxWidth="100%"
          overflow="auto"
        >
          <TrackedEditor onCodeChange={onCodeChange} />
        </View>
      </View>
    </LiveProvider>
  )
}
