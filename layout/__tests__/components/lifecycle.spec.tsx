import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { setState } from '@zup-it/nimbus-backend-core/actions/set-state'
import { omit } from 'lodash'
import { Lifecycle, LifecycleProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Lifecycle', () => {
    const name = 'lifecycle'
    const id = 'test-lifecyle'
    const props: LifecycleProps = {
      onInit: [
        setState({ path: 'global', value: 'Initialized' }),
      ],
      children: [
        <Text>This is the children test case.</Text>,
      ],
    }
    const options: ComponentTestOptions = {
      id,
      children: props.children,
      properties: omit(props, ['children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Lifecycle id={id} onInit={props.onInit}>{props.children}</Lifecycle>,
        name,
        options,
      )
    })
  })
})
