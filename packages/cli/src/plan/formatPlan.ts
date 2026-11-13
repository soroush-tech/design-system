import { diffLines } from './diff'
import type { Plan } from './planInit'

/** The plan as the developer reads it before saying yes: every file, every edit and the install. */
export function formatPlan(plan: Plan): string {
  const sections: string[] = []
  if (plan.creates.length > 0) {
    sections.push(['Create:', ...plan.creates.map((file) => `  ${file.path}`)].join('\n'))
  }
  for (const edit of plan.edits) {
    const diff = diffLines(edit.before, edit.after).map((line) => `    ${line}`.trimEnd())
    sections.push([`Edit ${edit.path}:`, ...diff].join('\n'))
  }
  if (plan.install) {
    const { command, args, env } = plan.install
    const prefix = Object.entries(env).map(([name, value]) => `${name}=${value} `)
    sections.push(`Install:\n  ${prefix.join('')}${[command, ...args].join(' ')}`)
  }
  if (plan.skips.length > 0) {
    sections.push(
      ['Skip:', ...plan.skips.map((skip) => `  ${skip.path}: ${skip.reason}`)].join('\n')
    )
  }
  if (plan.manual.length > 0) {
    sections.push(['Left to you:', ...plan.manual.map((step) => `  - ${step}`)].join('\n'))
  }
  return `${sections.join('\n\n')}\n`
}
