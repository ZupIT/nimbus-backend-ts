import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { push } from '@zup-it/nimbus-backend-core/actions'
import { FlowColumn, RemoteImage, Text } from '@zup-it/nimbus-backend-layout'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Button } from '../../components/button'

export const Welcome: Screen = () => (
  <FlowColumn>
    <RemoteImage url="https://i.ibb.co/rvRN9kv/logo.png" />
    <Text>Welcome to the Nimbus Playground!</Text>
    <Text>Use the panel on the left to start coding!</Text>
    <Button onPress={push('/docs.json')}>Access the fast guide</Button>
  </FlowColumn>
)
