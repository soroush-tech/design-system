// Without a markdown entry the theme has no `syntax` key.
import { useTheme } from '@gild-ui/react/useTheme'

export const Screen = () => {
  // @ts-expect-error -- 'syntax' is added by the markdown package, which this program does not import
  const syntax = useTheme().syntax
  return <>{syntax}</>
}
