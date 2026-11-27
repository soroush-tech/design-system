import { diffLines } from '../plan/diff'
import type { AppliedDependency, Report, StepPlan } from './simulate'

const formatDependency = ({ action, name, range, previous }: AppliedDependency) => {
  if (action === 'add') return `+ ${name} ${range}`
  if (action === 'update') return `~ ${name} ${previous} -> ${range}`
  return `- ${name} ${previous}`
}

/** A report as a line: where it is, then what to do. */
export const formatReport = ({ path, line, message }: Report): string =>
  `${line === undefined ? path : `${path}:${line}`} ${message}`

/** One step of the plan, as the developer reads it before saying yes. Ends with a line break. */
function formatStepPlan({ step, from, plan, dependencies, reports }: StepPlan, order: string) {
  const lines = [`Step ${order}: ${step.id} - ${step.summary}`]
  lines.push(`  ${from.package} ${from.version} -> ${step.to.package} ${step.to.version}`)
  if (dependencies.length > 0) {
    lines.push(
      '',
      '  Dependencies:',
      ...dependencies.map((item) => `    ${formatDependency(item)}`)
    )
  }
  if (plan.creates.length > 0) {
    lines.push('', '  Create:', ...plan.creates.map((file) => `    ${file.path}`))
  }
  for (const edit of plan.edits.filter((item) => item.path !== 'package.json')) {
    const diff = diffLines(edit.before, edit.after).map((line) => `      ${line}`.trimEnd())
    lines.push('', `  Edit ${edit.path}:`, ...diff)
  }
  if (reports.length > 0) {
    lines.push(
      '',
      '  To decide by hand:',
      ...reports.map((report) => `    - ${formatReport(report)}`)
    )
  }
  return `${lines.join('\n')}\n`
}

/** The whole plan, grouped by step. Ends with a line break. */
export function formatStepPlans(plans: readonly StepPlan[]): string {
  return plans
    .map((stepPlan, index) => formatStepPlan(stepPlan, `${index + 1} of ${plans.length}`))
    .join('\n')
}

/** The report items of every step, as a checklist; empty when there are none. */
export function formatChecklist(plans: readonly StepPlan[]): string {
  const reports = plans.flatMap((stepPlan) => stepPlan.reports)
  if (reports.length === 0) return ''
  return `Still left to you (${reports.length}):\n${reports.map((item) => `  [ ] ${formatReport(item)}`).join('\n')}\n`
}
