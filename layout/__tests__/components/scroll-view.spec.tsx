import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { omit } from 'lodash'
import { ScrollView, ScrollViewProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ScrollView', () => {
    const name = 'scrollView'
    const id = 'test-scroll-view'
    const props: ScrollViewProps = {
      direction: 'horizontal',
      scrollIndicator: true,
      children: [
        <Text>This is the children test case.</Text>,
      ],
    }
    const options: ComponentTestOptions = {
      id,
      children: props.children,
      properties: omit(props, ['style', 'children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <ScrollView
          id={id}
          direction={props.direction}
          scrollIndicator={props.scrollIndicator}
        >
          {props.children}
        </ScrollView>,
        name,
        options,
      )
    })
  })
})
