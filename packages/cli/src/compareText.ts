/** Orders two strings by their UTF-16 code units, as `sort()` does without a compare function. */
export const compareText = (a: string, b: string): number => Number(a > b) - Number(a < b)
