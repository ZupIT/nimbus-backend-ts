import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Margin, Size } from '@zup-it/nimbus-backend-core/model/style'
import { Color } from '@zup-it/nimbus-backend-core/model/style/color'
import { InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { childrenToInterpolatedText } from '@zup-it/nimbus-backend-core/utils'
import { StyledComponent } from './styled'

export interface TextStyle extends Margin, Size {
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

export interface TextProps extends WithStyle<TextStyle> {
  /**
   * The text to print.
   */
  children: InterpolatedText,
}

export const Text: FC<TextProps> = ({ id, children, style, ...props }) => {
  const text = childrenToInterpolatedText(children)
  return (
    <StyledComponent
      id={id}
      namespace={genericNamespace}
      name="text"
      style={{ size: 12.0, weight: 'normal', color: '#000', ...style }}
      properties={{ ...props, text }}
    />
  )
}
