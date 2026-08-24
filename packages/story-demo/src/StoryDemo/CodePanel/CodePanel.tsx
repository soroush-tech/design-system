import { Preview, type PreviewSlotProps } from '@soroush.tech/markdown/Preview'

// The pre slot's type requires children, but Preview supplies them - only the
// margin override travels through the slot.
const SLOT_PROPS: PreviewSlotProps = { pre: { my: 0 } as PreviewSlotProps['pre'] }

export interface CodePanelProps {
  /** The demo source to display. */
  code: string
  /** Sets the fence language so highlighting matches the toggle. */
  language: 'ts' | 'js'
}

/**
 * The read-only code panel: the demo source rendered as a fenced block through the
 * markdown `Preview`, which highlights it with the theme's syntax tokens and provides
 * the hover copy button via `CodeBlock`.
 */
export function CodePanel({ code, language }: Readonly<CodePanelProps>) {
  const fence = language === 'ts' ? 'tsx' : 'jsx'
  // The block sits flush inside the demo card - the card provides the spacing.
  return <Preview slotProps={SLOT_PROPS}>{`\`\`\`${fence}\n${code}\n\`\`\``}</Preview>
}
