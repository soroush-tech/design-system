// Type-level test: a component's hooks and their types are public from its entry point.
// Runs via `pnpm test:types`, against the built declarations.
import { useHoldRepeat, type UseHoldRepeatOptions } from '@gild-ui/react/NumberInput'
import { useAutoHide, type UseAutoHideParams } from '@gild-ui/react/Snackbar'

export const options: UseHoldRepeatOptions = { delay: 300, interval: 50 }
export const hold: ReturnType<typeof useHoldRepeat> = {
  start: () => undefined,
  stop: () => undefined,
}
export const params: UseAutoHideParams = { isOpen: true, duration: 4000, onHide: () => undefined }
export const hide: ReturnType<typeof useAutoHide> = {
  pause: () => undefined,
  resume: () => undefined,
}
