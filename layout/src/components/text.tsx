import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Margin, Size } from '@zup-it/nimbus-backend-core/model/style'
import { Color } from '@zup-it/nimbus-backend-core/model/style/color'
import { InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { childrenToInterpolatedText } from '@zup-it/nimbus-backend-core/utils'

export interface TextProps extends Margin, Size {
  /**
   * @default 12.0
   */
  size?: number,
  /**
   * @default 'normal'
   */
  weight?: 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black',
  /**
   * @default '#000'
   */
  color?: Color,
  /**
   * The text to print.
   */
  children: InterpolatedText,
}

export const Text: FC<TextProps> = ({ id, children, ...props }) => {
  const text = childrenToInterpolatedText(children)
  return <component id={id} namespace={genericNamespace} name="text" properties={{ ...props, text }} />
}
