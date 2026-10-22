import { describeTransition } from '../utils/test/describeTransition'
import { Fade } from './Fade'

describeTransition('Fade', Fade, {
  out: { opacity: '0' },
  shown: { opacity: '1' },
  properties: ['opacity'],
})
