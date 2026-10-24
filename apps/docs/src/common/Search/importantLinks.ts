import { searchEntriesFor, type SearchEntry, type SectionNav } from 'src/common/nav'

// The pages a reader most often wants first, by section - the ones the search offers before a
// word is typed. Each is named by its label, as the sidebar lists it.
const IMPORTANT: Record<SectionNav['pkg'], string[]> = {
  'design-system': [
    'Installation',
    'Usage',
    'All components',
    'Theming',
    'How to customize',
    'Button',
    'TextInput',
    'Autocomplete',
    'Tabs',
    'Menu',
  ],
  markdown: ['Overview', 'Preview', 'Editor', 'LiveEdit', 'CodeBlock'],
  mcp: ['Overview', 'Releases'],
  'ui-spec': ['Overview', 'Releases'],
  'styled-system': [
    'Overview',
    'Getting started',
    'How it works',
    'Responsive styles',
    'Theming',
    'API',
  ],
}

/** The most important pages of a section, in the order its readers want them. */
export const importantLinksFor = (section: SectionNav): SearchEntry[] => {
  const entries = searchEntriesFor(section).filter((entry) => entry.group !== 'Specs')
  return IMPORTANT[section.pkg].flatMap((label) => {
    const entry = entries.find((candidate) => candidate.label === label)
    return entry ? [entry] : []
  })
}
