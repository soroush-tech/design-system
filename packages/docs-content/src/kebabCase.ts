/** PascalCase or camelCase to kebab-case: `TextInput` -> `text-input`. */
export const kebabCase = (name: string): string =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
