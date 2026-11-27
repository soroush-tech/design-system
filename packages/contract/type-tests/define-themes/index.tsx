// The registered themes reach every component and hook: a color or a look the theme adds is
// accepted, a misspelling of one is not, and a custom token is typed.
import { Button } from '@gild-ui/react/Button'
import { Tabs } from '@gild-ui/react/Tabs'
import { useTheme } from '@gild-ui/react/useTheme'
import '../shared/themes'

export const Screen = () => {
  const grid: string = useTheme().chart.grid
  return (
    <>
      <Button color="brand" />
      {/* @ts-expect-error -- 'brnad' is not a color of the registered themes */}
      <Button color="brnad" />
      <Tabs variant="pill" />
      {/* @ts-expect-error -- 'pil' is not a look of the registered themes */}
      <Tabs variant="pil" />
      {grid}
    </>
  )
}
