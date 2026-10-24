import { Grid } from '@soroush.tech/design-system/Grid'
import { Paper } from '@soroush.tech/design-system/Paper'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import type { ControlModel } from '../../utils/controlsFor'
import { ArgControl } from '../ArgControl'

export interface ControlsPanelProps {
  controls: ControlModel[]
  /** Current arg values - composed story defaults merged with overrides. */
  values: Record<string, unknown>
  onChange: (name: string, value: unknown) => void
}

interface ControlGroup {
  /** The argTypes category (`table.category`) - none for controls that name no category. */
  category?: string
  controls: ControlModel[]
}

/** The controls in groups by category, in the order each category is first met. */
const groupByCategory = (controls: ControlModel[]): ControlGroup[] => {
  const groups: ControlGroup[] = []
  for (const control of controls) {
    const group = groups.find((entry) => entry.category === control.category)
    if (group) group.controls.push(control)
    else groups.push({ category: control.category, controls: [control] })
  }
  return groups
}

// A control with many options - a row of buttons - takes two columns, so it does not wrap
// into a tall stack beside its neighbours.
const MANY_OPTIONS = 4
const isWide = (control: ControlModel): boolean =>
  control.kind === 'inline-radio' && control.options!.length >= MANY_OPTIONS

/**
 * The Storybook-style controls section: one interactive control per include-listed
 * arg, driving both the rendered demo and the generated code. Controls sit in a grid of
 * equal columns - each with its name above - under a heading for their category. The
 * toolbar owns the open/closed toggle - this panel only renders its content.
 */
export function ControlsPanel({ controls, values, onChange }: Readonly<ControlsPanelProps>) {
  const groups = groupByCategory(controls)
  return (
    <Paper p={3} mx={2} mb={2}>
      {groups.map((group, position) => (
        <View
          key={group.category ?? ''}
          as="section"
          // A rule and room between the groups, none above the first.
          {...(position > 0 && {
            mt: 3,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'light' as const,
          })}
        >
          {group.category && (
            <Typography variant="caption" as="h3" color="primary" fontWeight="bold" m={0} mb={2}>
              {group.category}
            </Typography>
          )}
          <Grid gridTemplateColumns="repeat(auto-fill, minmax(12rem, 1fr))" gridGap={3}>
            {group.controls.map((control) => (
              <View
                key={control.name}
                style={isWide(control) ? { gridColumn: 'span 2' } : undefined}
              >
                <ArgControl control={control} value={values[control.name]} onChange={onChange} />
              </View>
            ))}
          </Grid>
        </View>
      ))}
    </Paper>
  )
}
