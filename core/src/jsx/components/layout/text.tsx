import { NimbusJSX } from '../../../jsx'
import { FC } from '../../../api'
import { genericNamespace } from '../../../constants'
import { Color } from '../../style/color'

export interface TextProps {
  text: string,
  /**
   * @default 12.0
   */
  size?: number,
  /**
   * @default normal
   */
  weight?: 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black',
  /**
   * @default #000
   */
  color?: Color,
}

export const Text: FC<TextProps> = ({ size = 12.0, weight = 'normal', color = '#000', ...props }) => (
  <component name="text" namespace={genericNamespace} properties={{ size, weight, color, ...props }}></component>
)
