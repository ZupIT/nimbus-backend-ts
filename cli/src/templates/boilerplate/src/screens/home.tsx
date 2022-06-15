import { NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { gte, length } from '@zup-it/nimbus-backend-core/operations'
import { globalState } from '../global-state'

export const Home: Screen = ({ navigator }) => (
  <>
    {/* <Text>Hello!</Text>
    <Text style={{ marginTop: 40 }}>This is the Home Page!</Text>
    <If condition={gte(length(globalContext.get('message') ?? ''), 0)}>
      <Then>
        <Text style={{ marginTop: 40 }}>Global context: {globalContext.get('message')}</Text>
      </Then>
    </If>
    <Button style={{ marginTop: 40 }} onPress={navigator.popView()}>Go back</Button> */}
  </>
)
