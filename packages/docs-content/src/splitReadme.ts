export interface SplitReadme {
  /** Everything before the first props heading - intro, usage, composition notes. */
  intro: string
  /** The props reference: the props heading up to (not including) the Examples section. */
  api: string
  /** The `## Examples` section onward. Empty when absent. */
  examples: string
}

// Component READMEs title their reference `## <Name>-specific props` or `## Props`.
const PROPS_HEADING = /^## .*[Pp]rops$/m
const EXAMPLES_HEADING = /^## Examples$/m

const trimRule = (section: string): string => section.replace(/\n---\s*$/m, '').trimEnd()

/** Splits a component README into demo-page intro, API-page reference, and examples. */
export const splitReadme = (source: string): SplitReadme => {
  const propsMatch = PROPS_HEADING.exec(source)
  if (!propsMatch) return { intro: source, api: '', examples: '' }
  const intro = trimRule(source.slice(0, propsMatch.index))
  const rest = source.slice(propsMatch.index)
  const examplesMatch = EXAMPLES_HEADING.exec(rest)
  if (!examplesMatch) return { intro, api: rest, examples: '' }
  return {
    intro,
    api: trimRule(rest.slice(0, examplesMatch.index)),
    examples: rest.slice(examplesMatch.index),
  }
}
