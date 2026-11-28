// The style prop takes entries of `StyleSheet.create` only, and `slotProps` is keyed by the slots a
// component declares for the theme: each slot takes a style, a class name and data and aria attributes.
import { StyleSheet, useStyle } from '@gild-ui/react'
import { Button } from '@gild-ui/react/Button'
import { Paper } from '@gild-ui/react/Paper'
import { Tooltip } from '@gild-ui/react/Tooltip'
import { View } from '@gild-ui/react/View'

const object = StyleSheet.create({ danger: { color: 'firebrick' }, wide: { width: '100%' } })
const themed = StyleSheet.create(() => ({ tint: { color: 'firebrick' } }))

export const Accepted = ({ isActive }: { isActive: boolean }) => {
  const styles = useStyle(themed)
  return (
    <>
      <Paper style={object.danger}>an entry</Paper>
      <View style={[object.danger, isActive && object.wide, null, undefined]}>a list</View>
      <Button style={styles.tint}>an entry of a sheet of the theme</Button>
      <Button slotProps={{ root: { style: object.wide, className: 'a', 'data-mark': 'b' } }}>
        slots
      </Button>
      <Tooltip
        title="Save"
        hasArrow
        slotProps={{ arrow: { style: object.danger, 'aria-hidden': true } }}
      >
        <span>arrow</span>
      </Tooltip>
    </>
  )
}

const plain = { padding: 12 }

export const Refused = () => (
  <>
    {/* @ts-expect-error -- a plain style object is not an entry */}
    <Paper style={plain}>plain</Paper>
    {/* @ts-expect-error -- not in a list either */}
    <Button style={[plain]}>plain</Button>
    {/* @ts-expect-error -- Button has no slot named header */}
    <Button slotProps={{ header: { className: 'a' } }}>slot</Button>
    {/* @ts-expect-error -- a slot takes a style entry, not a style object, and the arrow's position is the tooltip's */}
    <Tooltip title="Save" hasArrow slotProps={{ arrow: { style: { top: 4 } } }}>
      <span>arrow</span>
    </Tooltip>
    {/* @ts-expect-error -- a slot takes no handler: only style, className, data-* and aria-* */}
    <Button slotProps={{ root: { onClick: () => {} } }}>slot</Button>
  </>
)
