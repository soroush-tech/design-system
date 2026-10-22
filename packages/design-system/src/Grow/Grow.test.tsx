import { describeTransition } from '../utils/test/describeTransition'
import { Grow } from './Grow'

describeTransition('Grow', Grow, {
  out: { opacity: '0', transform: 'scale(0.75)' },
  shown: { opacity: '1', transform: 'none' },
  properties: ['opacity', 'transform'],
})
