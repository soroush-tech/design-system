import { entryGuides } from '@gild-ui/docs-content'

// The page of each entry point that is not a component: a file of the component library's docs.
const docs = import.meta.glob('packages/react/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** The markdown of an entry point's page. Throws (failing the prerender) when its file is gone. */
export const entryDoc = (entry: string): string => {
  const file = entryGuides[entry]
  const source = Object.entries(docs).find(([path]) => path.endsWith(`/docs/${file}`))?.[1]
  if (!source) throw new Error(`No doc "${file}" for the entry point "${entry}"`)
  return source
}
