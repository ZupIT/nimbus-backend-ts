import { FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { genericNamespace } from '@zup-it/nimbus-backend-core/constants'
import { WithAccessibility } from '@zup-it/nimbus-backend-core/model/component'
import { Size } from '@zup-it/nimbus-backend-core/model/style'
import { omit } from 'lodash'

export interface BaseImageProps extends Size, WithAccessibility {
  /**
   * @default center
   */
   scale?: 'fillBounds' | 'fillHeight' | 'fillWidth' | 'center',
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
  props?: RemoteImageProps | LocalImageProps
) => (
  <component
    id={id}
    namespace={genericNamespace}
    name={name}
    properties={{ scale: 'center', ...omit(props, ['children']) }}
  />
)

export const LocalImage: FC<LocalImageComponentProps> = ({ id, ...props }) =>
  getImageStyledComponent('localImage', id, { ...omit(props, ['localImageId']), id: props.localImageId })

export const RemoteImage: FC<RemoteImageProps> = ({ id, ...props }) =>
  getImageStyledComponent('remoteImage', id, props)
