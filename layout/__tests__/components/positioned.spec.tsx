import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Positioned, PositionedProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Positioned', () => {
    const name = 'positioned'
    const id = 'test-positioned'
    const state = createState('container-state-id')
    const properties: Omit<PositionedProps, 'children'> = {
      alignment: 'centerStart',
      x: 1,
      y: 2,
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
    }
    const children = <Text>This is the children test case.</Text>
    const options: ComponentTestOptions = {
      id,
      state,
      children,
      properties,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Positioned id={id} state={state} {...properties}>{children}</Positioned>,
        name,
        options,
      )
    })
  })
})
