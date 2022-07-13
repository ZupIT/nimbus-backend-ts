import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Text, TextProps } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Text', () => {
    const name = 'text'
    const id = 'test-text'
    const properties: Omit<TextProps, 'children'> = {
      size: 22.0,
      weight: 'semiBold',
      color: '#e3e3e3',
    }
    const options: ComponentTestOptions = {
      id,
      properties: {
        ...properties,
        text: 'This is the text component',
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<Text id={id} {...properties}>This is the text component</Text>, name, options)
    })
  })
})
