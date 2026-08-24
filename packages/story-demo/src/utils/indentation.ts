/** Strips the common leading whitespace of all non-empty lines and trims blank edges. */
export const dedent = (text: string): string => {
  const lines = text.split('\n')
  while (lines.length > 0 && lines[0].trim() === '') lines.shift()
  while (lines.length > 0 && lines.at(-1)!.trim() === '') lines.pop()
  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => /^\s*/.exec(line)![0].length)
  const common = indents.length > 0 ? Math.min(...indents) : 0
  return lines.map((line) => line.slice(common).trimEnd()).join('\n')
}

/** Prefixes every non-empty line with the given number of spaces. */
export const indent = (text: string, spaces: number): string => {
  const pad = ' '.repeat(spaces)
  return text
    .split('\n')
    .map((line) => (line.trim() === '' ? '' : pad + line))
    .join('\n')
}
