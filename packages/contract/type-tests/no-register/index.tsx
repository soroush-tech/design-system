// With no registration the colors are the built-in ones; the error names a color that is not.
import { Button } from '@gild-ui/react/Button'

export const Screen = () => (
  <>
    <Button color="primary" />
    {/* @ts-expect-error -- 'brand' is registered by no theme in this program */}
    <Button color="brand" />
  </>
)
