import { BackgroundColor } from './background-color'
import { Border } from './border'
import { Margin } from './margin'
import { Padding } from './padding'
import { Shadow } from './shadow'
import { Size } from './size'

export { BackgroundColor } from './background-color'
export { Border } from './border'
export { Margin } from './margin'
export { Padding } from './padding'
export { Shadow } from './shadow'
export { Size } from './size'

export interface Style extends BackgroundColor, Border, Margin, Padding, Size, Shadow {
}
