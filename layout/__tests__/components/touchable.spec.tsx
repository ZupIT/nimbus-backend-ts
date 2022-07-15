import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { setState } from '@zup-it/nimbus-backend-core/actions/set-state'
import { Text, Touchable, TouchableProps } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Touchable', () => {
    const name = 'touchable'
    const id = 'test-touchable'
    const properties: Omit<TouchableProps, 'children'> = {
      onPress: [
        setState({ path: 'global', value: 'Touchable pressed' }),
      ],
      accessibility: {
        isHeader: false,
        label: 'Test Touchable',
      },
    }
    const children = <Text>This is the children test case.</Text>
    const options: ComponentTestOptions = {
      id,
      children,
      properties,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<Touchable id={id} {...properties}>{children}</Touchable>, name, options)
    })
  })
})
