/**
 * A line diff of two texts, as printed lines: `+ ` added, `- ` removed, and up to `context`
 * unchanged lines around each change, with `  ...` where unchanged lines are left out. The files
 * it compares are an app's root, a few dozen lines, so the plain longest-common-subsequence
 * table is fast enough.
 */
export function diffLines(before: string, after: string, context = 2): string[] {
  const oldLines = before.split('\n')
  const newLines = after.split('\n')
  // common[i][j]: the length of the longest common subsequence of oldLines[i..] and newLines[j..].
  const common = Array.from({ length: oldLines.length + 1 }, () =>
    new Array<number>(newLines.length + 1).fill(0)
  )
  for (let i = oldLines.length - 1; i >= 0; i -= 1) {
    for (let j = newLines.length - 1; j >= 0; j -= 1) {
      common[i][j] =
        oldLines[i] === newLines[j]
          ? common[i + 1][j + 1] + 1
          : Math.max(common[i + 1][j], common[i][j + 1])
    }
  }

  const lines: { mark: ' ' | '+' | '-'; text: string }[] = []
  let i = 0
  let j = 0
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      lines.push({ mark: ' ', text: oldLines[i] })
      i += 1
      j += 1
    } else if (
      i < oldLines.length &&
      (j === newLines.length || common[i + 1][j] >= common[i][j + 1])
    ) {
      lines.push({ mark: '-', text: oldLines[i] })
      i += 1
    } else {
      lines.push({ mark: '+', text: newLines[j] })
      j += 1
    }
  }

  const isNearChange = (index: number) =>
    lines.slice(Math.max(0, index - context), index + context + 1).some((line) => line.mark !== ' ')
  const printed: string[] = []
  lines.forEach((line, index) => {
    if (isNearChange(index)) printed.push(`${line.mark} ${line.text}`.trimEnd())
    else if (printed.at(-1) !== '  ...') printed.push('  ...')
  })
  return printed
}
