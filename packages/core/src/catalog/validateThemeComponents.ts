import { catalogSources } from './sources'
import { themeComponents } from './themeComponents'

/** One thing wrong in a theme's `components`: where it is, and what is wrong there (the message starts with the path). */
export interface ThemeProblem {
  path: string
  message: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const list = (names: readonly unknown[]) => names.join(', ')

type Known = (typeof themeComponents)[string]
type Report = (path: string, message: string) => void
type NotAProp = (path: string, prop: string) => void

const checkSlots = (name: string, known: Known, styleOverrides: unknown, report: Report) => {
  if (!isRecord(styleOverrides)) return
  for (const slot of Object.keys(styleOverrides)) {
    if (!known.slots.includes(slot))
      report(
        `components.${name}.styleOverrides.${slot}`,
        `is not a slot of ${name} (${list(known.slots)})`
      )
  }
}

/** Whether one of the theme's own looks sets `prop` to `value`: a value the catalog cannot list. */
const isDefinedByLook = (looks: unknown[], prop: string, value: unknown) =>
  looks.some((look) => isRecord(look) && isRecord(look.props) && look.props[prop] === value)

const checkDefaults = (
  where: string,
  defaultProps: unknown,
  looks: unknown[],
  values: Record<string, { values?: readonly unknown[] } | undefined>,
  notAProp: NotAProp,
  report: Report
) => {
  if (!isRecord(defaultProps)) return
  for (const [prop, value] of Object.entries(defaultProps)) {
    const path = `${where}.defaultProps.${prop}`
    notAProp(path, prop)
    const listed = values[prop]?.values
    if (listed && !isDefinedByLook(looks, prop, value) && !listed.includes(value as never))
      report(path, `is ${JSON.stringify(value)}, not one of ${list(listed)}`)
  }
}

const checkLooks = (where: string, looks: unknown[], notAProp: NotAProp) => {
  looks.forEach((look, index) => {
    if (isRecord(look) && isRecord(look.props))
      for (const prop of Object.keys(look.props))
        notAProp(`${where}.variants[${index}].props.${prop}`, prop)
  })
}

const checkComponent = (
  name: string,
  known: Known,
  config: Record<string, unknown>,
  report: Report
) => {
  const where = `components.${name}`
  const options = catalogSources[name].entry.options
  const props = known.ownerState && [...known.ownerState, ...Object.keys(options)]
  const notAProp: NotAProp = (path, prop) => {
    if (props && !props.includes(prop)) report(path, `is not a prop of ${name} (${list(props)})`)
  }
  checkSlots(name, known, config.styleOverrides, report)
  const looks = Array.isArray(config.variants) ? config.variants : []
  checkDefaults(where, config.defaultProps, looks, options, notAProp, report)
  checkLooks(where, looks, notAProp)
}

/**
 * Checks a theme's `components` against the catalog, for a mistake the types cannot see (a theme
 * whose types were cast away, plain JavaScript, a theme read from a file): a component the design
 * system lacks, a slot a component has not, a default prop or a look's prop the component does not
 * take, and a default value outside the values the catalog lists for that prop. It returns the
 * problems; it never throws and never changes `components`.
 */
export const validateThemeComponents = (components: unknown): ThemeProblem[] => {
  const problems: ThemeProblem[] = []
  const report: Report = (path, message) => problems.push({ path, message: `${path} ${message}` })
  if (!isRecord(components)) return problems
  for (const [name, config] of Object.entries(components)) {
    const known = themeComponents[name]
    if (!known) {
      report(`components.${name}`, `is not a component (${list(Object.keys(themeComponents))})`)
    } else if (isRecord(config)) {
      checkComponent(name, known, config, report)
    }
  }
  return problems
}
