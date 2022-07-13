import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Positioned, Stack, StackProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Stack', () => {
    const name = 'stack'
    const id = 'test-stack'
    const state = createState('stack-state-id')
    const properties: Omit<StackProps, 'children'> = {
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
    const children = (
      <Positioned>
        <Text>This is the children test case.</Text>
      </Positioned>
    )
    const options: ComponentTestOptions = {
      id,
      state,
      children,
      properties,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<Stack id={id} state={state} {...properties}>{children}</Stack>, name, options)
    })

    it('should throw when children are not the Positioned component', () => {
      expect(() =>
        <Stack id={id} state={state} {...properties}>
          <Text>Text</Text>
        </Stack>
      ).toThrow()
    })
  })
})
