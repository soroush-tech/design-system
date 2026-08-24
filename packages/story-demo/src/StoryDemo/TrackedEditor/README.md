# TrackedEditor

`LiveEditor` with the provider's own onChange preserved. Passing `onChange` straight to
`LiveEditor` would replace react-live's context handler (its props spread last), so
edits would update the buffer but never re-evaluate. Internal to `LiveCode` - not
exported from the package.

## Props

### `onCodeChange`

Fired with the current buffer on every edit, after the provider's evaluator has been
notified.
