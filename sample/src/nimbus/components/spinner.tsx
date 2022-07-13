import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { customComponentNamespace } from './shared'

export const Spinner: FC = ({ id, ...props }) => (
  <component id={id} namespace={customComponentNamespace} name="spinner" properties={{ ...props }}></component>
)
