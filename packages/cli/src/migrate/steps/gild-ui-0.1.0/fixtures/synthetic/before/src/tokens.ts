import { styled } from '@soroush.tech/design-system'

export const Tint = styled('div')(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}1F`,
  marginLeft: `-${theme.space[2]}`,
  fontSize: `${theme.fontSizes[2]}px`,
  padding: theme.space[2] * 2,
  border: `1px solid ${theme.palette.primary.main}`,
  margin: `${theme.space[1]} ${theme.space[2]}`,
}))
