import { Button } from '@soroush.design/react/Button'
import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { incremented, type RootState } from '../../state/store'

/** A count, held in the Redux store, src/state/store, and the button that adds to it. */
export function Counter() {
  const count = useSelector((state: RootState) => state.count)
  const dispatch = useDispatch()
  const increment = () => dispatch(incremented())
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Button size="sm" variant="outlined" onClick={increment}>
        Count
      </Button>
      <Typography>Count: {count}</Typography>
    </Flex>
  )
}
