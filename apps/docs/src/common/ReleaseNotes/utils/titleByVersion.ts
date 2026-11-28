// A release's heading names the package and its version, as the file is the version's own:
// `@gild-ui/react@0.1.0` - under any scope, or none, as in `soroush.design@0.1.0`.
// The page is the package's, so the version alone is shown.
export const titleByVersion = (body: string): string =>
  body.replace(/^## (?:@[\w.-]+\/)?[\w.-]+@(\S+)/, '## v$1')
