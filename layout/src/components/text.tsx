import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Size } from '@zup-it/nimbus-backend-core/model/style'
import { Color } from '@zup-it/nimbus-backend-core/model/style/color'
import { Expression, InterpolatedText } from '@zup-it/nimbus-backend-core/types'
import { childrenToInterpolatedText } from '@zup-it/nimbus-backend-core/utils'

export interface TextProps extends Size {
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
  color?: Expression<Color>,
  /**
   * The text to print.
   */
  children: InterpolatedText,
  /**
   * On iOS, the text can be compressed to a single line when inside a Column or Row that tries to be as small as
   * possible given min or max size constraints. Setting this property to true prevents this from happening. This has
   * no effect on other platforms.
   *
   * @default false
   */
  iosAdaptiveSize?: boolean,
}

export const Text: FC<TextProps> = ({ id, children, ...props }) => {
  const text = childrenToInterpolatedText(children)
  return <component id={id} namespace={genericNamespace} name="text" properties={{ ...props, text }} />
}
