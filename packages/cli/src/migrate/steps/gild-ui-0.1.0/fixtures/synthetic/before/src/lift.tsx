import React from 'react'
import { Card } from '@soroush.tech/design-system/Card'
import { View } from '@soroush.tech/design-system/View'
import { styled } from '@soroush.tech/design-system'
import { useStyle } from '@soroush.tech/design-system/style'
import { Tooltip } from '@soroush.tech/design-system/Tooltip'

const Fancy = styled(View)(({ theme }) => ({ color: theme.palette.primary.main }))

export function Panel({ gap, color }: { gap: number; color: string }) {
  const hero = useStyle({ getStyles: (theme) => ({ padding: theme.space[2], borderRadius: theme.radii.md }) })
  const shared = useStyle(someFactory)
  return (
    <Card css={{ padding: 8, '&:hover': { opacity: 0.9, margin: -4 } }}>
      <View
        css={(theme) => ({
          color: theme.palette.primary.main,
          '&:hover': { color: theme.palette.primary.dark },
        })}
      />
      <View css={(t) => ({ margin: t.space[1] })} />
      <Fancy style={{ overflow: 'hidden', zIndex: -1 }} />
      <View style={{ width: gap }} />
      <View style={gap > 1 ? { flex: 1 } : undefined} />
      <View css={hero} />
      <View css={shared} />
      <div css={{ color: 'red' }} />
      <View css={{ color: gap > 1 ? 'red' : 'blue' }} />
      <View css={(theme) => ({ color })} />
      <View css={({ palette }) => ({ color: palette.primary.main })} />
      <Tooltip title="Hint" slotProps={{ arrow: { style: { top: 4 } } }}>
        <View style={{ cursor: 'help' }} />
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
  return <View css={(theme) => ({ gap: theme.space[2] })} />
})

export const Forwarded = React.forwardRef(function Forwarded(_props: object, ref: React.Ref<HTMLDivElement>) {
  return <View ref={ref} css={(theme) => ({ gap: theme.space[3] })} />
})

declare const someFactory: { getStyles: (theme: object) => object }
export { Arrow }
