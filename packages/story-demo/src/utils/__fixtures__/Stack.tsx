import type { ReactNode } from 'react'

export function Stack({
  children,
  ...rest
}: Readonly<{ children?: ReactNode; 'aria-label'?: string }>) {
  return <div {...rest}>{children}</div>
}
