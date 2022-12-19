import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Text, Touchable } from '@zup-it/nimbus-backend-layout'

export const Home: Screen = ({ navigator }) => (
  <Column
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      width="expand"
      height="expand"
      backgroundColor="#FFFFFF"
  >
    <Text size={20}>Hello!</Text>
    <Column marginVertical={40}>
      <Text weight="bold">This is the Home Page!</Text>
    </Column>
    <Touchable onPress={navigator.pop()}>
      <Text color="#0000FF">Go back</Text>
    </Touchable>
  </Column>
)
