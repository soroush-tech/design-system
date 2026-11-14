import { maskSource } from './maskSource'

/** Whether `code` declares `name` at all: a function, class, or binding of that name. */
const declares = (masked: string, name: string): boolean =>
  new RegExp(`\\b(?:function|class|const|let|var)\\s+${name}\\b`).test(masked)

/**
 * The name of the component a demo is wrapped in: `Demo`, unless the code it wraps declares
 * one already - a stories file's own helper - then `Example`, then `Demo2`, `Demo3`... Wrapped
 * in a second `Demo`, the helper would be shadowed, and the wrapper would render itself.
 */
export const pickWrapperName = (code: string): string => {
  const masked = maskSource(code)
  for (const name of ['Demo', 'Example']) {
    if (!declares(masked, name)) return name
  }
  let suffix = 2
  while (declares(masked, `Demo${suffix}`)) suffix++
  return `Demo${suffix}`
}
