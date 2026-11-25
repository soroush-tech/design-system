import { CodeBlock } from '@soroush.design/react-markdown/CodeBlock'
import type { ImportLine } from '@soroush.design/docs-content'

export interface ImportLinesProps {
  line: ImportLine
}

/** The install and the import of a page, from the package that exports what the page documents. */
export function ImportLines({ line }: Readonly<ImportLinesProps>) {
  return (
    <CodeBlock>
      <code>{`${line.install}\n${line.statement}`}</code>
    </CodeBlock>
  )
}
