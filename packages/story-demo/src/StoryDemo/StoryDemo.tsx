import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react'
import { composeStory } from '@storybook/react-vite'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { useCopyToClipboard } from '@soroush.tech/hooks/useCopyToClipboard'
import { buildDemoModule } from '../utils/buildDemoModule'
import { controlsFor, controlsInclude, type ControlsAnnotations } from '../utils/controlsFor'
import { openInCodeSandbox } from '../utils/openInCodeSandbox'
import { parseStoriesSource } from '../utils/parseStoriesSource'
import { snippetToModule } from '../utils/snippetToModule'
import { tsToJs } from '../utils/tsToJs'
import { CodePanel } from './CodePanel'
import { ControlsPanel } from './ControlsPanel'
import { DemoToolbar } from './DemoToolbar'

// Loaded after mount so react-live and its editor stay out of the initial bundle -
// prerendered pages ship the read-only view and upgrade to the live editor.
const LiveCode = lazy(() => import('./LiveCode').then((module) => ({ default: module.LiveCode })))

/** A CSF3 stories module namespace: `import * as stories from './X.stories.tsx'`. */
export interface StoriesModule {
  default: ControlsAnnotations
  [exportName: string]: unknown
}

/**
 * The identifiers available to live-edited code - components, tokens, css helpers.
 * A loader function defers the (potentially heavy) scope to after hydration.
 */
export type StoryDemoScope = Record<string, unknown> | (() => Promise<Record<string, unknown>>)

export interface StoryDemoProps {
  /** The stories module, imported as a namespace. */
  stories: StoriesModule
  /** The same module's raw text (`?raw` import). */
  source: string
  /** The named story export to demo. */
  storyName: string
  /** Section heading above the demo. */
  title: string
  /** Optional prose under the heading. */
  description?: string
  scope?: StoryDemoScope
  /** Version pins for own packages in the sandbox export; others ride at latest. */
  versions?: Record<string, string>
  /** The react / react-dom pin for the sandbox package.json. */
  reactVersion?: string
  /** The npm package that the stories' relative imports resolve to. */
  packageName?: string
}

type ComposedStory = ComponentType<Record<string, unknown>> & { args: Record<string, unknown> }

type Language = 'ts' | 'js'

/**
 * A live component example driven by a Storybook story: the rendered story, a
 * Storybook-style controls panel, and an always-editable code panel with collapsed
 * and expanded views, a TS/JS toggle, copy, reset, and CodeSandbox export. Controls,
 * the language toggle, and expand each regenerate the buffer (discarding manual
 * edits); reset restores everything.
 */
export function StoryDemo({
  stories,
  source,
  storyName,
  title,
  description,
  scope = {},
  versions = {},
  reactVersion = 'latest',
  packageName = '@soroush.tech/design-system',
}: Readonly<StoryDemoProps>) {
  const [language, setLanguage] = useState<Language>('ts')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [argOverrides, setArgOverrides] = useState<Record<string, unknown>>({})
  const [editedCode, setEditedCode] = useState<string | null>(null)
  // Bumped by every regeneration so the editor remounts with the fresh buffer even
  // when the generated code happens to be unchanged (e.g. reset after an edit).
  const [generation, setGeneration] = useState(0)
  const [liveScope, setLiveScope] = useState<Record<string, unknown> | null>(() =>
    typeof scope === 'function' ? null : scope
  )
  const { copied, copy } = useCopyToClipboard()

  // A loader scope resolves after mount: the prerendered page keeps the read-only
  // view (no eval on the server), then upgrades to the live editor. A failed load
  // leaves the read-only view in place.
  useEffect(() => {
    if (typeof scope !== 'function' || liveScope !== null) return
    let cancelled = false
    scope()
      .then((loaded) => {
        if (!cancelled) setLiveScope(loaded)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [scope, liveScope])

  const meta = stories.default
  const storyExport = stories[storyName]
  if (!storyExport) {
    throw new Error(`Unknown story "${storyName}" in the module for "${title}".`)
  }
  const Composed = useMemo(
    () =>
      composeStory(
        storyExport as Parameters<typeof composeStory>[0],
        meta as Parameters<typeof composeStory>[1]
      ) as unknown as ComposedStory,
    [storyExport, meta]
  )
  const parsed = useMemo(() => parseStoriesSource(source), [source])
  const parsedStory = parsed.stories.get(storyName)
  const controls = useMemo(
    () => controlsFor(meta, storyExport as ControlsAnnotations),
    [meta, storyExport]
  )
  // Render-driven stories that take no parameter ignore args entirely - no controls.
  const showControls =
    controls.length > 0 &&
    (parsedStory?.renderBody === undefined || parsedStory.renderParamKind !== 'none')
  const mergedArgs = useMemo(
    () => ({ ...Composed.args, ...argOverrides }),
    [Composed, argOverrides]
  )
  const demoModule = useMemo(
    () =>
      buildDemoModule({
        parsed,
        storyName,
        args: mergedArgs,
        include: controlsInclude(meta, storyExport as ControlsAnnotations),
        packageName,
      }),
    [parsed, storyName, mergedArgs, meta, storyExport, packageName]
  )
  const fullCode = language === 'js' ? tsToJs(demoModule.full) : demoModule.full
  // The preview's sections transpile one by one - joined they need not parse (an args
  // const flowing into bare JSX reads as a relational expression without a semicolon).
  const jsPreview = () => demoModule.previewParts.map((part) => tsToJs(part).trimEnd()).join('\n\n')
  // Kept as a thunk so the collapsed transpile is skipped entirely while expanded.
  const collapsedCode = () => (language === 'js' ? jsPreview() : demoModule.preview)
  const generatedCode = isExpanded ? fullCode : collapsedCode()
  const currentCode = editedCode ?? generatedCode

  // Every regeneration - a control change, the language or expand toggle, reset -
  // rebuilds the buffer from the story model and discards manual edits.
  const regenerate = () => {
    setEditedCode(null)
    setGeneration((current) => current + 1)
  }
  const handleControlChange = (name: string, value: unknown) => {
    setArgOverrides((overrides) => ({ ...overrides, [name]: value }))
    regenerate()
  }
  const handleLanguageChange = (next: Language) => {
    setLanguage(next)
    regenerate()
  }
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded)
    regenerate()
  }
  const handleReset = () => {
    setArgOverrides({})
    regenerate()
  }
  const handleOpenSandbox = () => {
    const sandboxSource =
      editedCode === null
        ? fullCode
        : snippetToModule(editedCode, {
            importsText:
              language === 'js' ? tsToJs(demoModule.importsText).trimEnd() : demoModule.importsText,
            helpersText:
              language === 'js' ? tsToJs(demoModule.helpersText).trimEnd() : demoModule.helpersText,
          })
    openInCodeSandbox(title, sandboxSource, { language, versions, reactVersion })
  }

  const toolbar = (
    <DemoToolbar
      language={language}
      onLanguageChange={handleLanguageChange}
      copied={copied}
      onCopy={() => copy(currentCode)}
      onOpenSandbox={handleOpenSandbox}
      onReset={handleReset}
      isExpanded={isExpanded}
      onToggleExpanded={handleToggleExpanded}
      hasControls={showControls}
      isControlsOpen={isControlsOpen}
      onToggleControls={() => setIsControlsOpen(!isControlsOpen)}
    />
  )
  const controlsPanel = showControls && isControlsOpen && (
    <ControlsPanel controls={controls} values={mergedArgs} onChange={handleControlChange} />
  )
  const readonlyBody = (
    <>
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
        <Composed {...argOverrides} />
      </Flex>
      {toolbar}
      {controlsPanel}
      <View px={2} pb={2}>
        <CodePanel code={generatedCode} language={language} />
      </View>
    </>
  )

  return (
    <View as="section" mb={5}>
      <Typography variant="h4" as="h2" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="secondary" gutterBottom>
          {description}
        </Typography>
      )}
      <View borderWidth="thin" borderColor="light" borderRadius="md">
        {liveScope === null ? (
          readonlyBody
        ) : (
          <Suspense fallback={readonlyBody}>
            <LiveCode
              key={generation}
              code={generatedCode}
              language={language}
              scope={liveScope}
              helpersText={demoModule.helpersText}
              onCodeChange={setEditedCode}
              toolbar={
                <>
                  {toolbar}
                  {controlsPanel}
                </>
              }
            />
          </Suspense>
        )}
      </View>
    </View>
  )
}
