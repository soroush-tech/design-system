/**
 * A function that gives the same result for the same two objects, so a provider hands the engine
 * the same theme object on every render. The engine keeps a theme's declarations by the object,
 * and on a server `useMemo` keeps nothing between renders: a theme made anew each render is
 * declared anew each render.
 */
export function derivedBy<A extends object, B extends object, Result extends object>(
  derive: (first: A, second: B) => Result
): (first: A, second: B) => Result {
  const results = new WeakMap<A, WeakMap<B, Result>>()
  return (first, second) => {
    let bySecond = results.get(first)
    if (!bySecond) {
      bySecond = new WeakMap()
      results.set(first, bySecond)
    }
    let result = bySecond.get(second)
    if (!result) {
      result = derive(first, second)
      bySecond.set(second, result)
    }
    return result
  }
}
