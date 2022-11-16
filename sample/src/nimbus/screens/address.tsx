import { Actions, createState, createStateNode, Expression, FC, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Row, ScreenComponent, ScrollView, Text } from '@zup-it/nimbus-backend-layout'
import { AddressModel } from '../../models/order'
import { Button } from '../components/button'
import { TextInput } from '../components/text-input'
import { fetchCepAddress } from '../network/address'
import { Payment } from './payment'

type AddressInputProps = {
  label: string,
  placeholder: string,
  name: keyof AddressModel,
  addressState: MapStateNode<AddressModel>,
  onBlur?: (value: Expression<string>) => Actions
}

const AddressInput: FC<AddressInputProps> = ({ placeholder, label, name, addressState, onBlur }) => (
  <Row marginTop={4}>
    <TextInput
      placeholder={placeholder}
      label={label}
      value={addressState.get(name)}
      onBlur={onBlur}
      onChange={value => addressState.get(name).set(value)}
    />
  </Row>
)

export const Address: Screen = ({ navigator }) => {
  const formAddress = createState<AddressModel>('formAddress')
  const fillByZip = (zip: Expression<string>) => fetchCepAddress({
    cep: zip,
    onSuccess: response => [
      formAddress.get('city').set(response.get('data').get('localidade')),
      formAddress.get('neighborhood').set(response.get('data').get('bairro')),
      formAddress.get('state').set(response.get('data').get('uf')),
      formAddress.get('street').set(response.get('data').get('logradouro')),
    ]
  })

  return (
    <ScreenComponent title="Address">
      <Column state={formAddress} backgroundColor="#EEEEEE">
        <Column padding={16} height="expand">
          <Row marginBottom={16}>
            <AddressInput
              label="Zip Code"
              placeholder="Eg: 95010-000"
              name="zip"
              addressState={formAddress}
              onBlur={fillByZip}
            />
          </Row>
          <Row marginBottom={12}>
            <Column marginEnd={6}>
              <AddressInput label="Street" placeholder="Eg: Rua das Árvores" name="street" addressState={formAddress} />
            </Column>
            <Column marginStart={6} width={90}>
              <AddressInput label="Number" placeholder="Eg: 101" name="number" addressState={formAddress} />
            </Column>
          </Row>
          <Row marginBottom={48}>
            <Column marginEnd={6}>
              <AddressInput label="City" placeholder="Eg: Uberlândia" name="city" addressState={formAddress} />
            </Column>
            <Column marginStart={6} width={70}>
              <AddressInput label="State" placeholder="Eg: MG" name="state" addressState={formAddress} />
            </Column>
          </Row>
        </Column>
        <Row mainAxisAlignment="spaceBetween" width="expand" padding={16}>
          <Button text="Cancel" onPress={navigator.pop()} />
          <Button text="Next" onPress={[navigator.push(Payment, { params: { address: formAddress } })]} />
        </Row>
      </Column>
    </ScreenComponent>
  )
}
