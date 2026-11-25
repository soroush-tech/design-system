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

/**
 * Checks a theme's `components` against the catalog, for a mistake the types cannot see (a theme
 * whose types were cast away, plain JavaScript, a theme read from a file): a component the design
 * system lacks, a slot a component has not, a default prop or a look's prop the component does not
 * take, and a default value outside the values the catalog lists for that prop. It returns the
 * problems; it never throws and never changes `components`.
 */
export const validateThemeComponents = (components: unknown): ThemeProblem[] => {
  const problems: ThemeProblem[] = []
  const report = (path: string, message: string) =>
    problems.push({ path, message: `${path} ${message}` })
  if (!isRecord(components)) return problems
  for (const [name, config] of Object.entries(components)) {
    const where = `components.${name}`
    const known = themeComponents[name]
    if (!known) {
      report(where, `is not a component (${list(Object.keys(themeComponents))})`)
      continue
    }
    if (!isRecord(config)) continue
    const options = catalogSources[name].entry.options
    const props = known.ownerState && [...known.ownerState, ...Object.keys(options)]
    const notAProp = (path: string, prop: string) =>
      props && !props.includes(prop) && report(path, `is not a prop of ${name} (${list(props)})`)
    if (isRecord(config.styleOverrides)) {
      for (const slot of Object.keys(config.styleOverrides)) {
        if (!known.slots.includes(slot))
          report(
            `${where}.styleOverrides.${slot}`,
            `is not a slot of ${name} (${list(known.slots)})`
          )
      }
    }
    const looks = Array.isArray(config.variants) ? config.variants : []
    if (isRecord(config.defaultProps)) {
      for (const [prop, value] of Object.entries(config.defaultProps)) {
        const path = `${where}.defaultProps.${prop}`
        notAProp(path, prop)
        const values = options[prop]?.values
        // A look the theme's own `variants` define is a value the catalog cannot list.
        const defined = looks.some(
          (look) => isRecord(look) && isRecord(look.props) && look.props[prop] === value
        )
        if (values && !defined && !values.includes(value as never))
          report(path, `is ${JSON.stringify(value)}, not one of ${list(values)}`)
      }
    }
    looks.forEach((look, index) => {
      if (isRecord(look) && isRecord(look.props))
        for (const prop of Object.keys(look.props))
          notAProp(`${where}.variants[${index}].props.${prop}`, prop)
    })
  }
  return problems
}
