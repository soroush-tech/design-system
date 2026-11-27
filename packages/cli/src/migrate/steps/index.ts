import type { MigrationStep } from '../step'

/**
 * Every migration step the command line carries. The runner orders them by the version each ends
 * on, so the list's order does not matter; add a step by importing its `steps/<id>/index.ts`.
 */
export const STEPS: readonly MigrationStep[] = []
