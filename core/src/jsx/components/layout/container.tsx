import { FC } from '../../../api'
import { NimbusJSX } from '../../../jsx'
import { LayoutCoreComponent } from '../styled'
import { ContainerProps } from './shared/container.types'

export const Container: FC<ContainerProps> = ({
  children,
  style,
  stretch = false,
  crossAxisAlignment = 'start',
  mainAxisAlignment = 'start',
  ...props
}) => (
  <LayoutCoreComponent
    name="container"
    style={style}
    properties={{ stretch, crossAxisAlignment, mainAxisAlignment, ...props }}
  >
    {children}
  </LayoutCoreComponent>
)
