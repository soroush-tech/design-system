// The arrow-key choice: what each key does to it, and how it is drawn. The terminal side lives in
// io.ts; this part is plain state, so it is tested without one.

/** One answer a choice offers. */
export interface Choice {
  /** What the command gets back. */
  value: string
  /** What the person reads. */
  label: string
}

/** Stopped with Ctrl+C or Escape, before an answer. */
export class CancelledError extends Error {
  constructor() {
    super('Stopped before an answer.')
    this.name = 'CancelledError'
  }
}

export interface ChoiceState {
  /** The choice the pointer is on. */
  cursor: number
  /** The values picked so far, in a choice of several; `undefined` in a choice of one. */
  picked: readonly string[] | undefined
}

/** What a key press means to a choice. */
export type ChoiceKey = 'up' | 'down' | 'toggle' | 'submit' | 'cancel' | 'none'

/** Reads a key as Node's `keypress` event names it. */
export function readChoiceKey(key: { name?: string; ctrl?: boolean } | undefined): ChoiceKey {
  if (!key) return 'none'
  if ((key.ctrl && key.name === 'c') || key.name === 'escape') return 'cancel'
  if (key.name === 'up' || key.name === 'k') return 'up'
  if (key.name === 'down' || key.name === 'j') return 'down'
  if (key.name === 'space') return 'toggle'
  if (key.name === 'return' || key.name === 'enter') return 'submit'
  return 'none'
}

/** The state after `key`: the pointer wraps around the ends, and space picks or unpicks. */
export function updateChoice(
  state: ChoiceState,
  key: 'up' | 'down' | 'toggle',
  choices: readonly Choice[]
): ChoiceState {
  const { cursor, picked } = state
  if (key === 'up') return { cursor: (cursor + choices.length - 1) % choices.length, picked }
  if (key === 'down') return { cursor: (cursor + 1) % choices.length, picked }
  if (!picked) return state
  const { value } = choices[cursor]
  const isPicked = picked.includes(value)
  // Kept in the choices' order, whatever order they were picked in.
  const next = choices
    .map((choice) => choice.value)
    .filter((candidate) => (candidate === value ? !isPicked : picked.includes(candidate)))
  return { cursor, picked: next }
}

/** The values a submitted choice answers with. */
export const getAnswer = ({ cursor, picked }: ChoiceState, choices: readonly Choice[]) =>
  picked ? [...picked] : [choices[cursor].value]

/** The question and its choices, as drawn while the person picks. Ends with a line break. */
export function formatChoice(
  question: string,
  { cursor, picked }: ChoiceState,
  choices: readonly Choice[]
): string {
  const hint = picked ? 'space to pick, enter when done' : 'arrows to move, enter to pick'
  const lines = choices.map(({ value, label }, index) => {
    const pointer = index === cursor ? '>' : ' '
    const box = picked ? (picked.includes(value) ? '[x] ' : '[ ] ') : ''
    return `${pointer} ${box}${label}`
  })
  return `? ${question}  (${hint})\n${lines.join('\n')}\n`
}

/** The question with its answer, as it stays once picked. Ends with a line break. */
export function formatAnswer(
  question: string,
  values: readonly string[],
  choices: readonly Choice[]
): string {
  const labels = choices.filter(({ value }) => values.includes(value)).map(({ label }) => label)
  return `? ${question}: ${labels.join(', ') || 'none'}\n`
}
