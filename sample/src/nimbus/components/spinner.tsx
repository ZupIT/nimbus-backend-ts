import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { StyledComponent } from '@zup-it/nimbus-backend-core/jsx/components/styled'
import { StyledComponentProps } from '@zup-it/nimbus-backend-core/jsx/components/styled/types'

export const Spinner: FC<Omit<StyledComponentProps, 'name'>> = ({ id, style, ...props }) => (
  <StyledComponent id={id} name="spinner" style={style} properties={props} />
)
