import readme from 'packages/react-hooks/README.md?raw'
import { hookImportLine, hookSection } from '@soroush.design/docs-content'
import { DocPage } from 'src/common/DocPage/DocPage'
import { usePageContext } from 'src/hooks/usePageContext'

export default function Page() {
  const { name } = usePageContext().routeParams
  return <DocPage source={hookSection(readme, name)} importLine={hookImportLine(name)} />
}
