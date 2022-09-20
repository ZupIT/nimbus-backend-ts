import { NimbusJSX, createState, ForEach } from '@zup-it/nimbus-backend-core'
import { insert, removeIndex } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Text } from '@zup-it/nimbus-backend-layout'
import { Button } from '../components/button'


export const MutableForEach: Screen = () => {
  const dataset = createState('dataset', [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Anthony"}
  ])
  const newItem = createState('newItem', { id: 4, name: "Paul"})

  return (
    <Column state={dataset}>
      <Column state={newItem}>
        <ForEach items={dataset} key="id">
          {item => (
            <Text>{item.get('name')}</Text>
          )}
        </ForEach>
        <Button id="add" text="Add one more" onPress={dataset.set(insert(dataset, newItem))} />
        <Button id="remove" text="Remove second" onPress={dataset.set(removeIndex(dataset, 1))} />
      </Column>
    </Column>
  )
}
