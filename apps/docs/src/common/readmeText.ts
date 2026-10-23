// What the component pages take out of a component README: its lead sentence for the page's
// header, and the accessibility sections it gives their own tab.

const HEADING = /^(#{1,6}) +(.*)$/
const ACCESSIBILITY_HEADING = /^(Accessibility|Keyboard|Focus|ARIA)\b/
const FENCE = /^\s*(```|~~~)/

export interface SplitAccessibility {
  /** The README without its accessibility sections. */
  rest: string
  /** The accessibility sections - `Accessibility`, `Keyboard`, `Focus`, `ARIA` - each with its body. */
  accessibility: string
}

/**
 * Splits a README into its accessibility sections and the rest. A section runs from its
 * heading to the next heading of the same or a higher level; a `#` inside a code fence is not
 * a heading.
 */
export const splitAccessibility = (source: string): SplitAccessibility => {
  const rest: string[] = []
  const accessibility: string[] = []
  let isFenced = false
  // The level of the accessibility section being read, or 0 outside one.
  let level = 0
  for (const line of source.split('\n')) {
    if (FENCE.test(line)) isFenced = !isFenced
    const heading = isFenced ? null : HEADING.exec(line)
    if (heading) {
      const depth = heading[1].length
      if (level > 0 && depth <= level) level = 0
      if (level === 0 && depth >= 2 && ACCESSIBILITY_HEADING.test(heading[2])) level = depth
    }
    ;(level > 0 ? accessibility : rest).push(line)
  }
  return {
    rest: rest
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd(),
    accessibility: accessibility
      .join('\n')
      .replace(/\n---\s*$/, '')
      .trim(),
  }
}

const plain = (markdown: string): string =>
  markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const MIN_LEAD = 50
const MAX_LEAD = 200

// A sentence ends at a stop before a capital, a tag, a quote or a code span - "e.g. a" does not.
const SENTENCE_END = /(?<=[.!?])\s+(?=[A-Z<`"])/

/**
 * The line under a component's name: the first sentences of the README's first paragraph with
 * words in it, as plain text - enough to say what it is, no more than two lines of it.
 */
export const leadOf = (source: string): string => {
  const paragraph =
    source
      .split(/\n\s*\n/)
      .filter((block) => !/^(#|---|```|\||<|[-*] |\d+\. )/.test(block.trim()))
      .map(plain)
      .find((text) => text !== '') ?? ''
  let lead = ''
  for (const sentence of paragraph.split(SENTENCE_END)) {
    lead = lead === '' ? sentence : `${lead} ${sentence}`
    if (lead.length >= MIN_LEAD) break
  }
  if (lead.length <= MAX_LEAD) return lead
  return `${lead.slice(0, MAX_LEAD).replace(/\s+\S*$/, '')}...`
}
