/**
 * Joins a scale name and a flattened leaf path into a dotted token path.
 *
 * A scalar scale - `blur`, `logoFilter` - is a leaf at the top of the theme, so
 * `flatten` gives it an empty path. Joining blindly would render `theme.blur.` in the
 * reference and a bare `` `` `` from `get_tokens`, neither of which is a property path a
 * reader can use.
 */
export const tokenPath = (...segments: string[]): string => segments.filter(Boolean).join('.')
