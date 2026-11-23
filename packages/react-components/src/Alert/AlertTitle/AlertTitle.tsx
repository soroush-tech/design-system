import type { ReactNode } from 'react'
import { get, styled } from '../../index'

export interface AlertTitleProps {
  /** The title. */
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

const AlertTitleRoot = styled('div', {
  name: 'AlertTitle',
  label: 'AlertTitle',
})(({ theme }) => ({
  marginBottom: theme.space[0.25],
  fontWeight: get(theme, 'fontWeights.semiBold'),
}))

/** @description The title of an `Alert`: its first line of the message, in a heavier weight. */
export function AlertTitle({
  children,
  className,
  'data-testid': dataTestid,
}: Readonly<AlertTitleProps>) {
  return (
    <AlertTitleRoot className={className} data-testid={dataTestid}>
      {children}
    </AlertTitleRoot>
  )
}
