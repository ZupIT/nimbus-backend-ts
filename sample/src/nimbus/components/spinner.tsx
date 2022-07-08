import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Style } from '@zup-it/nimbus-backend-core/model/style'
import { customComponentNamespace } from './shared'

export const Spinner: FC<WithStyle<Style>> = ({ id, style, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="spinner" properties={{ ...style, ...props }}></component>
  // <StyledComponent  />
)
