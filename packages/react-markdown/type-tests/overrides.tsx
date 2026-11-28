// Type-level test of the override channels, against the built declarations (`pnpm test:types`):
// `style` takes entries of `StyleSheet.create` only, and `slotProps` is keyed by the slots the
// component declares for the theme.
import { StyleSheet } from '@gild-ui/react'
import { CodeBlock } from '@gild-ui/react-markdown/CodeBlock'
import { Editor } from '@gild-ui/react-markdown/Editor'
import { LiveEdit } from '@gild-ui/react-markdown/LiveEdit'
import { Preview } from '@gild-ui/react-markdown/Preview'
import { Toolbar } from '@gild-ui/react-markdown/Toolbar'

const sheet = StyleSheet.create({ accent: { color: 'firebrick' } })

export const Accepted = ({ isActive }: { isActive: boolean }) => (
  <>
    <Editor style={sheet.accent} slotProps={{ root: { className: 'a', 'data-mark': 'b' } }} />
    <Preview
      style={[isActive && sheet.accent, null, undefined]}
      slotProps={{ root: { style: sheet.accent }, p: { color: 'primary' } }}
    >
      text
    </Preview>
    <LiveEdit slotProps={{ block: { style: sheet.accent }, root: { 'aria-label': 'Document' } }} />
    <Toolbar slotProps={{ strike: { className: 'a' }, tablePickerCell: { style: sheet.accent } }} />
    <CodeBlock style={sheet.accent} slotProps={{ surface: { style: sheet.accent } }}>
      code
    </CodeBlock>
  </>
)

const plain = { padding: 12 }

export const Refused = () => (
  <>
    {/* @ts-expect-error -- a plain style object is not an entry */}
    <Editor style={plain} />
    {/* @ts-expect-error -- not in a list either */}
    <Preview style={[{ padding: 12 }]}>text</Preview>
    {/* @ts-expect-error -- Toolbar has no slot named header */}
    <Toolbar slotProps={{ header: { className: 'a' } }} />
    {/* @ts-expect-error -- CodeBlock has no slot named block */}
    <CodeBlock slotProps={{ block: { className: 'a' } }}>code</CodeBlock>
    {/* @ts-expect-error -- a slot takes a style entry, not a style object */}
    <LiveEdit slotProps={{ block: { style: { top: 4 } } }} />
  </>
)
