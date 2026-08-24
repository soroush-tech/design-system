import type { ReactNode } from 'react'

export interface SampleProps {
  children?: ReactNode
  size?: 'sm' | 'md'
  disabled?: boolean
  'aria-label'?: string
}

export function Sample({ children, size = 'md', disabled, ...rest }: Readonly<SampleProps>) {
  return (
    <button type="button" data-size={size} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
