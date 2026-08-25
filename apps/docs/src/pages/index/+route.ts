// Vike config-time file: the src alias is unavailable here, so the import is relative.
import { docsSection } from '../../common/sectionRoute'

// The landing page exists only on the live site. Snapshot builds hand '/' to the
// section overview, so the landing moves aside (it also has prerender: false there).
export default docsSection() ? '/-landing' : '/'
