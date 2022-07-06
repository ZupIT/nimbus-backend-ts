import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { omit } from 'lodash'
import { BoxProps, FlowRow, Text } from 'src/api'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

jest.mock('src/components/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('FlowRow', () => {
    const name = 'flowRow'
    const id = 'test-flow-row'
    const state = createState('flow-row-state-id')
    const props: BoxProps = {
      style: {
        backgroundColor: '#fff',
        shadow: [
          {
            blur: 0.6,
            color: '#000',
            x: 3,
            y: 2,
          },
        ],
        margin: 10,
        padding: 10,
        width: 200,
        height: 130,
        minWidth: 100,
        minHeight: 30,
        maxWidth: 300,
        maxHeight: 200,
        clipped: true,
        borderWidth: 1,
        borderDashLength: 0.5,
        borderDashSpacing: 3,
        cornerRadius: 50,
        borderColor: '#000',
      },
      children: [
        <Text>This is the children test case.</Text>,
      ],
      state,
    }
    const options: ComponentTestOptions = {
      id,
      state,
      children: props.children,
      properties: omit(props, ['state', 'children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <FlowRow id={id} style={props.style} state={props.state}>{props.children}</FlowRow>,
        name,
        options,
      )
    })
  })
})
