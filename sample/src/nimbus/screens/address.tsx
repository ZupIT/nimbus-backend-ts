import { Actions, Expression, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { AddressModel } from '../../models/order'
import { Button } from '../components/button'
import { TextInput } from '../components/text-input'
import { globalState } from '../global-state'
import { fetchCepAddress } from '../network/address'
import { Payment } from './payment'

type AddressInputProps = {
  placeholder: string,
  name: keyof AddressModel,
  addressState: MapStateNode<AddressModel>,
  onBlur?: (value: Expression<string>) => Actions
}
const AddressInput: FC<AddressInputProps> = ({ placeholder, name, addressState: state, onBlur }) => {
  const getField = (name: keyof AddressModel) => state.get(name)
  const setField = (name: keyof AddressModel, value: Expression<string>) => state.get(name).set(value)
  return (
    <Row marginTop={4}>
      <TextInput {...{ placeholder, onBlur }} value={getField(name)} onChange={value => setField(name, value)} />
    </Row>
  )
}

const AddressLabel: FC<{ text: string }> = ({ text }) => <Text size={12} weight="light" color="#666">{text}</Text>

export const Address: Screen = ({ navigator }) => {
  const address = globalState.get('address')
  const fillByZip = (zip: Expression<string>) => fetchCepAddress({
    cep: zip,
    onSuccess: response => [
      address.get('city').set(response.get('data').get('localidade')),
      address.get('neighborhood').set(response.get('data').get('bairro')),
      address.get('state').set(response.get('data').get('uf')),
      address.get('street').set(response.get('data').get('logradouro')),
    ]
  })

  return (
    <ScreenComponent title="Address">
      <Column backgroundColor="#f2f2f2" flex={1}>
        <ScrollView>
          <Column padding={12}>
            <Row marginBottom={12}>
              <Column>
                <AddressLabel text="Zip Code" />
                <AddressInput placeholder="Eg: 95010-000" name="zip" addressState={address} onBlur={fillByZip} />
              </Column>
            </Row>
            <Row marginBottom={12}>
              <Column marginEnd={6}>
                <AddressLabel text="Street" />
                <AddressInput placeholder="Eg: Rua das Árvores" name="street" addressState={address} />
              </Column>
              <Column marginStart={6} width={90}>
                <AddressLabel text="Number" />
                <AddressInput placeholder="Eg: 101" name="number" addressState={address} />
              </Column>
            </Row>
            <Row marginBottom={48}>
              <Column marginEnd={6}>
                <AddressLabel text="City" />
                <AddressInput placeholder="Eg: Uberlândia" name="city" addressState={address} />
              </Column>
              <Column marginStart={6} width={70}>
                <AddressLabel text="State" />
                <AddressInput placeholder="Eg: MG" name="state" addressState={address} />
              </Column>
            </Row>
            <Row mainAxisAlignment="center">
              <Button text="Next" onPress={[globalState.get('address').set(address), navigator.push(Payment)]} />
            </Row>
          </Column>
        </ScrollView>
      </Column>
    </ScreenComponent>
  )
}
