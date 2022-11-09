import { createState, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { BoxProps, LazyColumn, Text } from 'src/api'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('LazyColumn', () => {
    const name = 'lazyColumn'
    const id = 'test-lazy-column'
    const state = createState('lazy-column-state-id')
    const properties: BoxProps = {
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
        <LazyColumn
          id={id}
          state={state}
          {...properties}
        >
          {children}
        </LazyColumn>,
        name,
        options
      )
    })
  })
})
