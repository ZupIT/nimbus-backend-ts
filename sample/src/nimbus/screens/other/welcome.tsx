import { Actions, Else, FC, ForEach, If, NimbusJSX, Then, WithChildren, WithState } from '@zup-it/nimbus-backend-core'
import { log } from '@zup-it/nimbus-backend-core/actions'
import { eq, isNull, not } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'

interface ContainerProps extends WithChildren, WithState {
  first: string
  second: number
  third: boolean
}

interface TextProps {
  text: string,
  onPress?: Actions
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
    <Text text='Bleil' onPress={log({ message: 'Hello', level: 'Info' })}></Text>
    <If condition={eq(1, 1)}>
      <Then>
        <Text text='Then result'></Text>
      </Then>
      <Else>
        <Text text='Else result'></Text>
      </Else>
    </If>
    <ForEach items={['Arthur', 'Daniel', 'Hernand', 'Tiago']} key="myKey">
      {myKey => (
        <Text text={myKey.toString()}></Text>
      )}
    </ForEach>
    <ForEach items={[{ name: 'Arthur', age: 30 }, { name: 'Daniel' }, { name: 'Hernand' }, { name: 'Tiago' }]}>
      {myKey => (
        <>
          <Text text={myKey.get('name').toString()}></Text>
          <If condition={not(isNull(myKey.get('age')))}>
            <Then>
              <Text text={myKey.get('age').toString()}></Text>
            </Then>
          </If>
        </>
      )}
    </ForEach>
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
