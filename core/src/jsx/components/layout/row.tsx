import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { ContainerProps } from './shared/container.types'

export const Row: FC<ContainerProps> = ({
  children,
  style,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <LayoutCoreComponent
    name="row"
    style={style}
    properties={{ stretch, crossAxisAlignment, mainAxisAlignment, ...props }}
  >
    {children}
  </LayoutCoreComponent>
)
