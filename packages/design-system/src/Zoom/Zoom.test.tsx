import { describeTransition } from '../utils/test/describeTransition'
import { Zoom } from './Zoom'

describeTransition('Zoom', Zoom, {
  out: { transform: 'scale(0)' },
  shown: { transform: 'none' },
  properties: ['transform'],
})
