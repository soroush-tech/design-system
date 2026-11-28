/**
 * One hook's page, cut from the hooks library's README: the `## useX` section, with its heading
 * as the page's title. Throws when the README has no such section, which fails the prerender.
 */
export const hookSection = (readme: string, name: string): string => {
  const start = readme.indexOf(`\n## ${name}\n`)
  if (start === -1) throw new Error(`The hooks README has no section "${name}"`)
  const section = readme.slice(start + 1)
  const next = section.indexOf('\n## ', 3)
  return (next === -1 ? section : section.slice(0, next)).trim().replace(/^## /, '# ')
}
