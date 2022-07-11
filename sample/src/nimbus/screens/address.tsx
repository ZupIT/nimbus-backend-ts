import { Actions, capitalize, createState, Expression, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Style } from '@zup-it/nimbus-backend-core/model/style'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Container, Row, ScreenComponent } from '@zup-it/nimbus-backend-layout'
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

  const formItemStyle: Style = { marginVertical: 10, marginHorizontal: 20 }

  const createInput = ({ name, flex, onBlur }: {
    name: keyof AddressModel,
    flex?: number,
    onBlur?: (value: Expression<string>) => Actions,
  }) => (
    <TextInput
      placeholder={capitalize(name)}
      style={{ ...(flex ? { flex } : {}), ...formItemStyle }}
      value={address.get(name)}
      onChange={value => address.get(name).set(value)}
      onBlur={onBlur}
    />
  )

  return (
    <ScreenComponent title="Address">
      <Container style={{ flex: 1 }}>
        {createInput({ name: 'zip', onBlur: fillByZip })}
        <Row style={{ mainAxisAlignment: 'spaceBetween' }}>
          {createInput({ name: 'street', flex: 2 })}
          {createInput({ name: 'number', flex: 1 })}
        </Row>
        <Row style={{ mainAxisAlignment: 'spaceBetween' }}>
          {createInput({ name: 'city', flex: 3 })}
          {createInput({ name: 'state', flex: 1 })}
        </Row>
      </Container>
      <Row style={{ mainAxisAlignment: 'spaceBetween' }}>
        <Button onPress={navigator.pop()} style={formItemStyle}>Cancel</Button>
        <Button onPress={navigator.push(Payment, { navigationState: { address }})} style={formItemStyle}>Next</Button>
      </Row>
    </ScreenComponent>
  )
}
