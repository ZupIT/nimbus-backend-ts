import { Actions, capitalize, Expression, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
import { AddressModel } from '../../models/order'
import { Button } from '../components/button'
import { TextInput } from '../components/text-input'
import { globalState } from '../global-state'
import { fetchCepAddress } from '../network/address'
import { Payment } from './payment'

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

  const createInput = ({ name, flex, onBlur }: {
    name: keyof AddressModel,
    flex?: number,
    onBlur?: (value: Expression<string>) => Actions,
  }) => (
    <TextInput
      placeholder={capitalize(name)}
      { ...(flex ? { flex } : {}) }
      marginVertical={10}
      marginHorizontal={20}
      value={address.get(name)}
      onChange={value => address.get(name).set(value)}
      onBlur={onBlur}
    />
  )

  return (
    <ScreenComponent title="Address">
      <Column flex={1}>
        {createInput({ name: 'zip', onBlur: fillByZip })}
        <Row mainAxisAlignment="spaceBetween">
          {createInput({ name: 'street', flex: 2 })}
          {createInput({ name: 'number', flex: 1 })}
        </Row>
        <Row mainAxisAlignment="spaceBetween">
          {createInput({ name: 'city', flex: 3 })}
          {createInput({ name: 'state', flex: 1 })}
        </Row>
      </Column>
      <Row mainAxisAlignment="spaceBetween">
        <Button text="Cancel" onPress={navigator.pop()} marginVertical={10} marginHorizontal={20} />
        <Button
          text="Next"
          onPress={navigator.push(Payment, { navigationState: { address }})}
          marginVertical={10}
          marginHorizontal={20}
        />
      </Row>
    </ScreenComponent>
  )
}
