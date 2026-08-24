// Vite's `?raw` imports resolve to the file's text - declared locally because vite is
// not a direct dependency of this package (the consuming app's Vite serves them).
declare module '*?raw' {
  const content: string
  export default content
}
