import { NimbusJSX, createState, sum, gte } from '@zup-it/nimbus-backend-core'
import { conditionalAction, log } from '@zup-it/nimbus-backend-core/actions'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, Text } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'

interface SecondPageData extends ScreenRequest {
  params: {
    name: string,
    age: string,
  }
}

export const SecondPage: Screen<SecondPageData> = ({ getViewState }) => {
  const beers = createState('beers', 0)
  const name = getViewState('name')
  const age = getViewState('age')

  return (
    <Column state={beers}>
      <Text>{name} has {beers} bears.</Text>
      <Button text="Buy 1 beer" onPress={
        conditionalAction({
          condition: gte(age, 18),
          onTrue: beers.set(sum(beers, 1)),
          onFalse: log({ message: `${name} must be at least 18 years old to drink.`, level: 'Error' })
        })
      } />
    </Column>
  )
}
