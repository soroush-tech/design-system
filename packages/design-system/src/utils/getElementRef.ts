import { version, type ReactElement, type Ref } from 'react'

/**
 * The ref an element was given, where its React version keeps it: React 19 hands `ref` over as a
 * prop, while React 18 keeps it on the element itself and leaves it out of the props. A component
 * that clones a child and adds a ref of its own reads the child's here, so both refs still get the
 * node. No element, no ref.
 */
export function getElementRef<T>(
  element: ReactElement | null | undefined,
  reactVersion: string = version
): Ref<T> | undefined {
  if (!element) return undefined
  const isRefAProp = Number.parseInt(reactVersion, 10) >= 19
  const holder = (isRefAProp ? element.props : element) as { ref?: Ref<T> }
  return holder.ref
}
