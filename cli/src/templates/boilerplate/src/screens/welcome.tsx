import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'

export const Welcome: Screen = ({ navigator }) => (
  <></>
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
  //   <Text style={{ marginTop: 40 }}>Welcome to the Nimbus Backend with TypeScript!</Text>
  //   <Text style={{ marginTop: 5 }}>This is a boilerplate application, so you can modify as you want!</Text>
  //   <Button style={{ marginTop: 40 }} onPress={globalState.set({ message: 'I came from welcome page!' })}>
  //     Set Global State
  //   </Button>
  //   <Button style={{ marginTop: 40 }} onPress={navigator.pushView(Home)}>Navigate to Home Page</Button>
  // </Container>
)
