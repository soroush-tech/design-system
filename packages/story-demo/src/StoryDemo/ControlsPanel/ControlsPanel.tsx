import { Flex } from '@soroush.tech/design-system/Flex'
import { Paper } from '@soroush.tech/design-system/Paper'
import type { ControlModel } from '../../utils/controlsFor'
import { ArgControl } from '../ArgControl'

export interface ControlsPanelProps {
  controls: ControlModel[]
  /** Current arg values - composed story defaults merged with overrides. */
  values: Record<string, unknown>
  onChange: (name: string, value: unknown) => void
}

/**
 * The Storybook-style controls section: one interactive control per include-listed
 * arg, driving both the rendered demo and the generated code. The toolbar owns the
 * open/closed toggle - this panel only renders its content.
 */
export function ControlsPanel({ controls, values, onChange }: Readonly<ControlsPanelProps>) {
  return (
    <Paper p={3} mx={2} mb={2}>
      <Flex flexDirection="row" flexWrap="wrap" gap={3} alignItems="flex-end">
        {controls.map((control) => (
          <ArgControl
            key={control.name}
            control={control}
            value={values[control.name]}
            onChange={onChange}
          />
        ))}
      </Flex>
    </Paper>
  )
}
