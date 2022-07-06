import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { BaseImageProps, LocalImage, LocalImageProps, RemoteImage, RemoteImageProps } from 'src/api'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/components/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Image', () => {
    const id = 'image-test'
    const props: BaseImageProps = {
      accessibility: {
        isHeader: false,
        label: 'Test image',
      },
      style: {
        width: 200,
        height: 130,
        minWidth: 100,
        minHeight: 30,
        maxWidth: 300,
        maxHeight: 200,
        clipped: true,
        scale: 'fillHeight',
      },
    }

    it('should create the local image component', () => {
      const localImageProps: LocalImageProps = { ...props, id: 'test-local-image' }
      const options = { id, properties: localImageProps }
      expectComponentToBeCorrect(
        <LocalImage
          id={id}
          style={props.style}
          localImageId={options.properties.id}
          accessibility={options.properties.accessibility}
        />,
        'localImage',
        options
      )
    })

    it('should create the remote image component', () => {
      const remoteImageProperties: RemoteImageProps = {
        ...props,
        url: 'https://usebeagle.io/test.jpg',
        placeholder: 'https://google.com/test.jpg',
      }
      const options = {
        id,
        properties: remoteImageProperties,
      }
      expectComponentToBeCorrect(
        <RemoteImage
          id={id}
          style={props.style}
          url={remoteImageProperties.url}
          placeholder={remoteImageProperties.placeholder}
          accessibility={options.properties.accessibility}
        />,
        'remoteImage',
        options,
      )
    })
  })
})
