import { NimbusJSX, createState } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'
import { TextInput } from '../components/text-input'
import { SecondPage } from './second-page'

export const FirstPage: Screen = ({ navigator }) => {
  const name = createState('name', '')
  const age = createState('age', '')

  return (
    <Column state={[name, age]}>
      <TextInput value={name} label="Name" placeholder="Write your name" onChange={value => name.set(value)} />
      <TextInput value={age} label="Age" placeholder="Write your age" onChange={value => age.set(value)} />
      <Button text="Next" onPress={navigator.push(SecondPage, { params: { name, age }})} />
    </Column>
  )
}
