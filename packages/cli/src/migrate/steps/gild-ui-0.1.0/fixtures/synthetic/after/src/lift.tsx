import React from 'react'
import { Card } from '@gild-ui/react/Card'
import { View } from '@gild-ui/react/View'
import { styled } from '@gild-ui/react/styled'
import { useStyle } from '@gild-ui/react/useStyle'
import { Tooltip } from '@gild-ui/react/Tooltip'
import { StyleSheet } from '@gild-ui/react/StyleSheet'

const heroSheet = StyleSheet.create((theme) => ({
  root: { padding: theme.space[2], borderRadius: theme.radii.md },
}))

const styles = StyleSheet.create({
  card: { padding: 8, '&:hover': { opacity: 0.9, margin: -4 } },
  fancy: { overflow: 'hidden', zIndex: -1 },
  view: { cursor: 'help' },
})

const viewSheet = StyleSheet.create((theme) => ({
  root: {
    color: theme.palette.primary.main,
    '&:hover': { color: theme.palette.primary.dark },
  },
}))

const viewSheet2 = StyleSheet.create((t) => ({
  root: { margin: t.space[1] },
}))

const viewSheet3 = StyleSheet.create((theme) => ({
  root: { gap: theme.space[2] },
}))

const viewSheet4 = StyleSheet.create((theme) => ({
  root: { gap: theme.space[3] },
}))

const Fancy = styled(View)(({ theme }) => ({ color: theme.palette.primary.main }))

export function Panel({ gap, color }: { gap: number; color: string }) {
  const viewStyles = useStyle(viewSheet)
  const viewStyles2 = useStyle(viewSheet2)
  const hero = useStyle(heroSheet).root
  const shared = useStyle(someFactory)
  return (
    <Card style={styles.card}>
      <View
        style={viewStyles.root}
      />
      <View style={viewStyles2.root} />
      <Fancy style={styles.fancy} />
      <View style={{ width: gap }} />
      <View style={gap > 1 ? { flex: 1 } : undefined} />
      <View style={hero} />
      <View css={shared} />
      <div css={{ color: 'red' }} />
      <View css={{ color: gap > 1 ? 'red' : 'blue' }} />
      <View css={(theme) => ({ color })} />
      <View css={({ palette }) => ({ color: palette.primary.main })} />
      <Tooltip title="Hint" slotProps={{ arrow: { style: { top: 4 } } }}>
        <View style={styles.view} />
      </Tooltip>
    </Card>
  )
}

const Arrow = () => <View css={(theme) => ({ padding: theme.space[1] })} />

export class Legacy extends React.Component {
  render() {
    return <Card css={(theme) => ({ gap: theme.space[1] })} />
  }
}

export function OneLine() { return <View css={(theme) => ({ gap: theme.space[1] })} /> }

export const memoized = React.memo(function Memoized() {
  const viewStyles3 = useStyle(viewSheet3)
  return <View style={viewStyles3.root} />
})

export const Forwarded = React.forwardRef(function Forwarded(_props: object, ref: React.Ref<HTMLDivElement>) {
  const viewStyles4 = useStyle(viewSheet4)
  return <View ref={ref} style={viewStyles4.root} />
})

declare const someFactory: { getStyles: (theme: object) => object }
export { Arrow }
