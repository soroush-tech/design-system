import readme from 'packages/react-hooks/README.md?raw'
import { DocPage } from 'src/common/DocPage/DocPage'

export default function Page() {
  return <DocPage title="Hooks" source={readme} />
}
