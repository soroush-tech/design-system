import { content } from './content'
import { feedback } from './feedback'
import { inputs } from './inputs'
import { layout } from './layout'
import { motion } from './motion'
import { navigation } from './navigation'

/** Every component's drawing, by its name. */
export const illustrations = {
  ...layout,
  ...content,
  ...inputs,
  ...navigation,
  ...feedback,
  ...motion,
}
