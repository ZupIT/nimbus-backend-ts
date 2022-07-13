import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { ScrollView, ScrollViewProps, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ScrollView', () => {
    const name = 'scrollView'
    const id = 'test-scroll-view'
    const properties: Omit<ScrollViewProps, 'children'> = {
      direction: 'horizontal',
      scrollIndicator: true,
    }
    const children = <Text>This is the children test case.</Text>
    const options: ComponentTestOptions = {
      id,
      children,
      properties,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<ScrollView id={id} {...properties}>{children}</ScrollView>, name, options)
    })
  })
})
