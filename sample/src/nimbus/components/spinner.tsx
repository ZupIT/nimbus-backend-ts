import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { Style } from '@zup-it/nimbus-backend-core/model/style'
import { StyledComponent } from '@zup-it/nimbus-backend-layout/components/styled'
import { customComponentNamespace } from './shared'

export const Spinner: FC<WithStyle<Style>> = ({ id, style, ...props }) => (
  <StyledComponent id={id} namespace={customComponentNamespace} name="spinner" style={style} properties={props} />
)
