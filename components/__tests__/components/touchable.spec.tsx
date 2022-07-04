import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { setState } from '@zup-it/nimbus-backend-core/actions/set-state'
import { omit } from 'lodash'
import { Text, Touchable, TouchableProps } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Touchable', () => {
    const name = 'touchable'
    const id = 'test-touchable'
    const props: TouchableProps = {
      onPress: [
        setState({ path: 'global', value: 'Touchable pressed' }),
      ],
      children: <Text>This is the children test case.</Text>,
      accessibility: {
        isHeader: false,
        label: 'Test Touchable',
      },
    }
    const options: ComponentTestOptions = {
      id,
      children: props.children,
      properties: omit(props, ['children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Touchable
          id={id}
          onPress={props.onPress}
          accessibility={props.accessibility}
        >
          {props.children}
        </Touchable>,
        name,
        options,
      )
    })
  })
})
