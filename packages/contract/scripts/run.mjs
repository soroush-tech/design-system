// Runs the contract: the export lists against the built packages, and every type-test program,
// holding the failing set to expected-failures.json. Exits 1 when they differ.
import { register } from 'tsx/esm/api'

register()
const { checkAll } = await import('../src/check.ts')
const { built, met, report } = await checkAll()
if (built.length) console.log(`built: ${built.join(', ')}`)
console.log(report)
process.exit(met ? 0 : 1)
