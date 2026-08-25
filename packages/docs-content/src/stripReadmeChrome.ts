/**
 * Drops a README's leading `# Title` line and any badge lines (`[![...`) - the page
 * supplies its own heading, and badge images would violate the site's CSP.
 */
export const stripReadmeChrome = (readme: string): string =>
  readme
    .split('\n')
    .filter((line, index) => !(index === 0 && line.startsWith('# ')) && !line.startsWith('[!['))
    .join('\n')
    .replace(/^\n+/, '')
