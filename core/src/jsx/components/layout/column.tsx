import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { ContainerProps } from './shared/container.types'

export const Column: FC<ContainerProps> = ({
  children,
  style,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <LayoutCoreComponent
    name="column"
    style={style}
    properties={{ stretch, crossAxisAlignment, mainAxisAlignment, ...props }}
  >
    {children}
  </LayoutCoreComponent>
)
