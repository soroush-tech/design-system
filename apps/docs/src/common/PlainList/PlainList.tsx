import { styled } from '@gild-ui/react'
import { View } from '@gild-ui/react/View'

/** A list with no bullets: a `View` for `as="ul"`, which takes its margin and padding from props. */
export const PlainList = styled(View)({ listStyle: 'none' })
