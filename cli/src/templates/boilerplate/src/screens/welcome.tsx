import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { Home } from './home'

export const Welcome: Screen = ({ navigator }) => (
  <Column
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      width="expand"
      height="expand"
      backgroundColor="#FFFFFF"
  >
    <Text size={20} weight="bold" alignment="center">Welcome to the Nimbus Backend with TypeScript!</Text>
    <Column marginVertical={40}>
      <Text alignment="center">This is a boilerplate application, so you can modify it as you want!</Text>
    </Column>
    <Touchable onPress={navigator.push(Home)}>
      <Text color="#0000FF">Navigate to the Home Page</Text>
    </Touchable>
  </Column>
)
