export type ControlOption = string | number

export interface ControlModel {
  kind: 'boolean' | 'text' | 'number' | 'select' | 'inline-radio' | 'range'
  name: string
  description?: string
  /** The documented default (`table.defaultValue.summary`) - shown while unset. */
  defaultValue?: string
  options?: ControlOption[]
  min?: number
  max?: number
  step?: number
}

interface ArgTypeControl {
  type?: string
  min?: number
  max?: number
  step?: number
}

interface ArgType {
  control?: string | ArgTypeControl
  options?: ControlOption[]
  description?: string
  table?: { defaultValue?: { summary?: string } }
}

/** The subset of a CSF meta or story annotation the controls panel reads. */
export interface ControlsAnnotations {
  parameters?: { controls?: { include?: string[] } }
  argTypes?: Record<string, ArgType | undefined>
}

const OPTION_KINDS = new Set(['select', 'inline-radio'])
const SIMPLE_KINDS = new Set(['boolean', 'text', 'number', 'range'])

/** The story's `controls.include` whitelist, falling back to meta's. */
export const controlsInclude = (meta: ControlsAnnotations, story: ControlsAnnotations): string[] =>
  story.parameters?.controls?.include ?? meta.parameters?.controls?.include ?? []

/**
 * The interactive controls a story exposes, resolved Storybook-style: the story's
 * `controls.include` whitelist (falling back to meta's) ordered as written, each name
 * mapped through the merged argTypes. Unsupported control types are omitted.
 */
export const controlsFor = (
  meta: ControlsAnnotations,
  story: ControlsAnnotations
): ControlModel[] => {
  const include = controlsInclude(meta, story)
  const argTypes = { ...meta.argTypes, ...story.argTypes }
  const models: ControlModel[] = []
  for (const name of include) {
    const argType = argTypes[name]
    if (!argType?.control) continue
    const control =
      typeof argType.control === 'string' ? { type: argType.control } : argType.control
    const { type } = control
    if (type === undefined) continue
    const defaultValue = argType.table?.defaultValue?.summary
    if (OPTION_KINDS.has(type)) {
      if (!argType.options?.length) continue
      models.push({
        kind: type as ControlModel['kind'],
        name,
        description: argType.description,
        defaultValue,
        options: argType.options,
      })
      continue
    }
    if (!SIMPLE_KINDS.has(type)) continue
    models.push({
      kind: type as ControlModel['kind'],
      name,
      description: argType.description,
      defaultValue,
      min: control.min,
      max: control.max,
      step: control.step,
    })
  }
  return models
}
