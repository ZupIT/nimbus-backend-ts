import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { ScreenComponent, ScreenProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Screen', () => {
    const name = 'screen'
    const id = 'test-screen'
    const state = createState('screen-state-id')
    const properties: Omit<ScreenProps, 'children'> = {
      ignoreSafeArea: ['trailing', 'bottom'],
      title: 'Test Screen',
      showBackButton: true,
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
        <ScreenComponent id={id} state={state} {...properties}>{children}</ScreenComponent>,
        name,
        options,
      )
    })
  })
})
