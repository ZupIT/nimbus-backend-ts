import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { Size } from '@zup-it/nimbus-backend-core/jsx/style'
import { WithAccessibility, WithStyle } from '@zup-it/nimbus-backend-core/model/component'
import { omit } from 'lodash'
import { StyledComponent } from './styled'

export interface BaseImageStyle extends Size {
  /**
   * @default center
   */
  scale?: 'fillBounds' | 'fillHeight' | 'fillWidth' | 'center',
}

export interface BaseImageProps extends WithStyle<BaseImageStyle>, WithAccessibility {
}

export interface LocalImageProps extends BaseImageProps {
  id?: string,
}

export interface LocalImageComponentProps extends BaseImageProps {
  localImageId?: string,
}

export interface RemoteImageProps extends BaseImageProps {
  url: string,
  placeholder?: string,
}

const getImageStyledComponent = (
  name: string,
  id?: string,
  style?: Size,
  props?: RemoteImageProps | LocalImageProps
) => (
  <StyledComponent
    id={id}
    namespace={genericNamespace}
    name={name}
    style={{ scale: 'center', ...style }}
    properties={omit(props, ['children'])}
  />
)

export const LocalImage: FC<LocalImageComponentProps> = ({ id, style, ...props }) =>
  getImageStyledComponent('localImage', id, style, { ...omit(props, ['localImageId']), id: props.localImageId })

export const RemoteImage: FC<RemoteImageProps> = ({ id, style, ...props }) =>
  getImageStyledComponent('remoteImage', id, style, props)
