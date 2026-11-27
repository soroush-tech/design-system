import type { ComponentProps, ElementType } from 'react'
import type { StyledStatics } from '@umber-style/react'
import { mergeOverrides, type StrictStyled } from './overrides'

/**
 * A component made by `styled` that takes `slotProps.root` as well as `style` and `className`, for the
 * layout primitives whose root is the component itself. It keeps what makes it a styled component
 * (its styles, tag and target), so `styled(Component)` still flattens into one element and the
 * component is still a selector.
 */
export function withRootOverrides<C extends ElementType & StyledStatics>(Root: C): StrictStyled<C> {
  const Component = ({ slotProps, style, className, ...rest }: ComponentProps<StrictStyled<C>>) => {
    const Element = Root as ElementType
    return <Element {...rest} {...mergeOverrides(slotProps?.root, { style, className })} />
  }
  return Object.assign(Component, {
    _styles: Root._styles,
    _tag: Root._tag,
    _shouldForwardProp: Root._shouldForwardProp,
    _target: Root._target,
    toString: () => Root.toString(),
  }) as unknown as StrictStyled<C>
}
