import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { omit } from 'lodash'
import { BaseImageProps, LocalImage, LocalImageProps, RemoteImage, RemoteImageProps } from 'src/api'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Image', () => {
    const id = 'image-test'
    const properties: BaseImageProps = {
      accessibility: {
        isHeader: false,
        label: 'Test image',
      },
      width: 200,
      height: 130,
      minWidth: 100,
      minHeight: 30,
      maxWidth: 300,
      maxHeight: 200,
      clipped: true,
      scale: 'fillHeight',
    }

    it('should create the local image component', () => {
      const localImageProps: LocalImageProps = { ...properties, id: 'test-local-image' }
      const options = { id, properties: localImageProps }
      const restProps = omit(localImageProps, ['id'])
      expectComponentToBeCorrect(
        <LocalImage id={id} localImageId={localImageProps.id} {...restProps} />,
        'localImage',
        options
      )
    })

    it('should create the remote image component', () => {
      const remoteImageProperties: RemoteImageProps = {
        ...properties,
        url: 'https://usebeagle.io/test.jpg',
        placeholder: 'https://google.com/test.jpg',
      }
      const options = {
        id,
        properties: remoteImageProperties,
      }
      expectComponentToBeCorrect(<RemoteImage id={id} {...remoteImageProperties} />, 'remoteImage', options)
    })
  })
})
