import { CodeBlock } from '@soroush.tech/markdown/CodeBlock'
import { Editor } from '@soroush.tech/markdown/Editor'
import { Paper } from '@soroush.tech/design-system/Paper'
import { useCopyToClipboard } from '@soroush.tech/hooks/useCopyToClipboard'

export const Page = () => (
  <Paper style={{ padding: 8 }}>
    <CodeBlock />
    <Editor />
  </Paper>
)

export { useCopyToClipboard }
