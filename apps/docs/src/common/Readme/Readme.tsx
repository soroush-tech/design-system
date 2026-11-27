import { useMemo } from 'react'
import { Preview } from '@gild-ui/react-markdown/Preview'
import { View } from '@gild-ui/react/View'
import { rewriteReadmeLinks } from './utils/rewriteReadmeLinks'
import { stripReadmeChrome } from '@gild-ui/docs-content'

export interface ReadmeProps {
  /** Raw markdown source (a `?raw` import of a README or docs file). */
  source: string
  /** Drop the leading H1 and badge lines - for pages that render their own heading. */
  stripChrome?: boolean
}

/** Renders an in-repo markdown file with its relative links rewritten to site routes. */
export function Readme({ source, stripChrome = false }: Readonly<ReadmeProps>) {
  const markdown = useMemo(
    () => rewriteReadmeLinks(stripChrome ? stripReadmeChrome(source) : source),
    [source, stripChrome]
  )
  return (
    <View>
      <Preview>{markdown}</Preview>
    </View>
  )
}
