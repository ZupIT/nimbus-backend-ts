import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { omit } from 'lodash'
import { Screen, ScreenProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Screen', () => {
    const name = 'screen'
    const id = 'test-screen'
    const state = createState('screen-state-id')
    const props: ScreenProps = {
      ignoreSafeArea: ['trailing', 'bottom'],
      title: 'Test Screen',
      showBackButton: true,
      children: <Text>This is the children test case.</Text>,
    }
    const options: ComponentTestOptions = {
      id,
      state,
      children: props.children,
      properties: omit(props, ['style', 'children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Screen
          id={id}
          state={state}
          ignoreSafeArea={props.ignoreSafeArea}
          title={props.title}
          showBackButton={props.showBackButton}
        >
          {props.children}
        </Screen>,
        name,
        options,
      )
    })
  })
})
