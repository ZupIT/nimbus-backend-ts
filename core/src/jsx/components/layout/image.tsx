import { NimbusJSX } from '../../../jsx'
import { WithAccessibility } from '../../../model/component'
import { Size } from '../../style'
import { FC } from '../../types'
import { LayoutCoreComponent } from '../styled'
import { LayoutCoreComponentProps } from '../styled/types'

interface BaseImageProps extends Omit<LayoutCoreComponentProps<Size>, 'children'>, WithAccessibility {
  /**
   * @default center
   */
  scale?: 'fillBounds' | 'fillHeight' | 'fillWidth' | 'center',
}

export interface LocalImageProps extends BaseImageProps {
  id?: string,
}

export interface RemoteImageProps extends BaseImageProps {
  url: string,
  placeholder?: string,
}

export const LocalImage: FC<LocalImageProps> = ({ style, ...props }) => (
  <LayoutCoreComponent
    name="localImage"
    style={{ scale: 'center', ...style }}
    properties={props}
  />
)

export const RemoteImage: FC<RemoteImageProps> = ({ style, ...props }) => (
  <LayoutCoreComponent
    name="remoteImage"
    style={{ scale: 'center', ...style }}
    properties={props}
  />
)
