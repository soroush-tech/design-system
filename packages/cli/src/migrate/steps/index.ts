import type { MigrationStep } from '../step'
import { step as gildUi010 } from './gild-ui-0.1.0'

/**
 * Every migration step the command line carries. The runner orders them by the version each ends
 * on, so the list's order does not matter; add a step by importing its `steps/<id>/index.ts`.
 */
export const STEPS: readonly MigrationStep[] = [gildUi010]
