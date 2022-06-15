import { Actions, FC, NimbusJSX, WithChildren, WithState } from '@zup-it/nimbus-backend-core'
import { alert } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'

interface ContainerProps extends WithChildren, WithState {
  first: string
  second: number
  third: boolean
}

interface TextProps {
  text: string,
  onPress: Actions
}

const Container: FC<ContainerProps> = ({ children, state, ...props }) => (
  <component name="wrapper" namespace="arthur" state={state} properties={props}>{children}</component>
)

const Text: FC<TextProps> = ({ ...props }) => (
  <component name="text" properties={props}></component>
)

export const Welcome: Screen = () => (
  <Container first='Text' second={9} third={false}>
    <>Arthur</>
    <Text text='Bleil' onPress={alert('Hello')}></Text>
  </Container>
  // <Container
  //   style={{
  //     flexDirection: 'COLUMN',
  //     alignItems: 'CENTER',
  //     justifyContent: 'CENTER',
  //     height: 100,
  //     backgroundColor: colors.white,
  //   }}
  // >
  //   <Image type="remote" url="https://i.ibb.co/rvRN9kv/logo.png" style={{ width: 242, height: 225 }} />
  //   <Text style={{ marginTop: 40 }}>Welcome to the Nimbus Playground!</Text>
  //   <Text style={{ marginTop: 5 }}>Use the panel on the left to start coding!</Text>
  //   <Button style={{ marginTop: 40 }} onPress={pushView('/docs.json')}>Access the fast guide</Button>
  // </Container>
)
