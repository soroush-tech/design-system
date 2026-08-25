import { styledSystemDocs, styledSystemGuides, styledSystemDocSlug } from 'src/common/nav'

const sources = import.meta.glob('packages/styled-system/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const registry = [...styledSystemDocs, ...styledSystemGuides]

const findSource = (file: string): string | undefined =>
  Object.entries(sources).find(([key]) => key.endsWith(`/docs/${file}`))?.[1]

/** URL segment (under /styled-system/docs/) to the doc's raw markdown and label. */
export const docBySlug = new Map(
  registry.map(({ label, file }) => [
    styledSystemDocSlug(file),
    { label, source: findSource(file) ?? '' },
  ])
)
