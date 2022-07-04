import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { omit } from 'lodash'
import { Text, TextProps } from 'src/api'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

jest.mock('src/components/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Text', () => {
    const name = 'text'
    const id = 'test-text'
    const props: TextProps = {
      children: 'This is the text component',
      style: {
        size: 22.0,
        weight: 'semiBold',
        color: '#e3e3e3',
      },
    }
    const options: ComponentTestOptions = {
      id,
      properties: {
        ...omit(props, ['state', 'children']),
        text: props.children,
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Text id={id} style={props.style}>{props.children}</Text>,
        name,
        options,
      )
    })
  })
})
