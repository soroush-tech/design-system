import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useAtom } from 'jotai'
import { countAtom } from '../../state/counter'
/** A count, held in a Jotai atom, src/state/counter, and the button that adds to it. */
export function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const increment = () => setCount(count + 1)
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Button size="sm" variant="outlined" onClick={increment}>
        Count
      </Button>
      <Typography>Count: {count}</Typography>
    </Flex>
  )
}
