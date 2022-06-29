import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Size } from '@zup-it/nimbus-backend-core/jsx/style'
import { WithAccessibility } from '@zup-it/nimbus-backend-core/model/component'
import { StyledComponent, StyledComponentProps } from './styled'

interface BaseImageProps extends Omit<StyledComponentProps<Size>, 'children'>, WithAccessibility {
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

const getImageStyledComponent = (
  name: string,
  id?: string,
  style?: Size,
  props?: Parameters<FC<RemoteImageProps | LocalImageProps>>[0]
) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name={name}
    style={{ scale: 'center', ...style }}
    properties={props}
  />
)

export const LocalImage: FC<LocalImageProps> = ({ id, style, ...props }) =>
  getImageStyledComponent('localImage', id, style, props)

export const RemoteImage: FC<RemoteImageProps> = ({ id, style, ...props }) =>
  getImageStyledComponent('remoteImage', id, style, props)
