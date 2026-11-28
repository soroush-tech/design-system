import { CodeBlock } from '@gild-ui/react-markdown/CodeBlock'
import { Editor } from '@gild-ui/react-markdown/Editor'
import { Paper } from '@gild-ui/react/Paper'
import { useCopyToClipboard } from '@gild-ui/hooks/useCopyToClipboard'
import { StyleSheet } from '@gild-ui/react/StyleSheet'

const styles = StyleSheet.create({
  paper: { padding: 8 },
})

export const Page = () => (
  <Paper style={styles.paper}>
    <CodeBlock />
    <Editor />
  </Paper>
)

export { useCopyToClipboard }
