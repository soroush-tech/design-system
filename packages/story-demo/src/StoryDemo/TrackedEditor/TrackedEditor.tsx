import { useContext } from 'react'
import { LiveContext, LiveEditor } from 'react-live'

export interface TrackedEditorProps {
  /** Fired with the current buffer on every edit. */
  onCodeChange: (code: string) => void
}

/**
 * LiveEditor with the provider's own onChange preserved. Passing onChange straight to
 * LiveEditor would replace react-live's context handler (its props spread last), so
 * edits would update the buffer but never re-evaluate.
 */
export function TrackedEditor({ onCodeChange }: Readonly<TrackedEditorProps>) {
  const { onChange } = useContext(LiveContext)
  return (
    <LiveEditor
      onChange={(nextCode) => {
        onChange(nextCode)
        onCodeChange(nextCode)
      }}
    />
  )
}
