import { catalog } from '@gild-ui/core/catalog'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@gild-ui/react/Table'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'

export interface SlotsTableProps {
  /** The component's name, as the catalog keys it. */
  name: string
}

/**
 * The parts of a component that `slotProps` and `theme.components.<Name>.styleOverrides` name, from the
 * catalog. Left out for a component with none.
 */
export function SlotsTable({ name }: Readonly<SlotsTableProps>) {
  const slots = catalog.components[name]?.slots
  if (!slots?.length) return null
  return (
    <View as="section" my={4}>
      <Typography variant="h4" as="h2" id="slots" gutterBottom>
        Slots
      </Typography>
      <Typography variant="body1" gutterBottom>
        Each slot takes a <code>style</code> (an entry of <code>StyleSheet.create</code>), a{' '}
        <code>className</code> and <code>data-*</code> and <code>aria-*</code> attributes in{' '}
        <code>slotProps</code>, and the same names in <code>styleOverrides</code> of the theme.
      </Typography>
      <Table aria-label={`${name} slots`}>
        <TableHead>
          <TableRow>
            <TableCell>Slot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slots.map((slot) => (
            <TableRow key={slot}>
              <TableCell>
                <code>{slot}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  )
}
