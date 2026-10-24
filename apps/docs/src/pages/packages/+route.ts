// Vike config-time file: the src alias is unavailable here, so the import is relative.
import { docsSection } from '../../common/sectionRoute'

// The packages page exists only on the live site. A snapshot build is one package's docs, so
// the page moves aside there (it also has prerender: false).
export default docsSection() ? '/-packages' : '/packages'
