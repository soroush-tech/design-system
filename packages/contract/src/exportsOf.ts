import ts from 'typescript6'

/** The names an entry point exports: `values` exist at run time, `types` exist in the type space. A class or a merged const and interface is in both. */
export interface ExportList {
  values: string[]
  types: string[]
}

const byName = (a: string, b: string) => a.localeCompare(b)

/** Reads the names each declaration file exports, following re-exports through chunks, with the compiler's own checker. One program serves every file. */
export const exportsOf = (files: string[]): Record<string, ExportList> => {
  const program = ts.createProgram(files, {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  })
  const checker = program.getTypeChecker()
  const lists: Record<string, ExportList> = {}
  for (const file of files) {
    const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(file) as ts.SourceFile)
    const list: ExportList = { values: [], types: [] }
    for (const symbol of moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []) {
      const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
      if (target.flags & ts.SymbolFlags.Value) list.values.push(symbol.name)
      if (target.flags & ts.SymbolFlags.Type) list.types.push(symbol.name)
    }
    lists[file] = { values: list.values.toSorted(byName), types: list.types.toSorted(byName) }
  }
  return lists
}
