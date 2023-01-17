import { createState, Else, ForEach, If, NimbusJSX, Then } from '@zup-it/nimbus-backend-core'
import { conditionalAction, log } from '@zup-it/nimbus-backend-core/actions'
import { MapStateNode } from '@zup-it/nimbus-backend-core/model/state/types'
import { isEmpty, isNull, multiply } from '@zup-it/nimbus-backend-core/operations'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, LazyColumn, Lifecycle, RemoteImage, Row, ScreenComponent, ScrollView, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { Product as ProductModel } from '../../models/product'
import { Button } from '../components/button'
import { Loading } from '../fragments/loading'
import { globalState } from '../global-state'
import { getCart } from '../network/cart'
import { formatPrice } from '../operations'
import { Address } from './address'
import { Product } from './product'

export const Cart: Screen = ({ navigator }) => {
  const cart = globalState.get('cart')
  const isLoading = createState('isLoading', true)

  const onInit = conditionalAction({
    condition: isNull(cart),
    onTrue: getCart({
      onSuccess: (response) => cart.set(response.get('data')),
      onError: (response) => log({ message: response.get('message'), level: 'error' }),
      onFinish: isLoading.set(false)
    }),
    onFalse: isLoading.set(false),
  })

  const goToDetails = (product: MapStateNode<ProductModel>) => [
    navigator.present(Product, {
      state: {
        product,
      }
    })
  ]

  const emptyCartView = (
    <Column width="expand" height="expand" padding={20} mainAxisAlignment="center" crossAxisAlignment="center">
      <Text alignment="center">Your cart is empty. Go to the products page and add some products.</Text>
    </Column>
  )

  const cartView = (
    <>
      <Column height="expand">
        <ScrollView>
          <Column padding={16}>
            <ForEach items={cart.get('products')} key="id">
              {(product) => (
                <Touchable onPress={goToDetails(product)}>
                  <Row
                    padding={12}
                    marginBottom={14}
                    borderColor="#e3e3e3"
                    borderWidth={1}
                    backgroundColor="#FFFFFF"
                    cornerRadius={12}
                    crossAxisAlignment="center"
                    width="expand"
                  >
                    <RemoteImage url={product.get('image')} width={50} scale="fillWidth" />
                    <Row marginStart={16} width="expand" mainAxisAlignment="spaceBetween">
                      { /* todo: by removing the following row with expand, the Text in Android acts differently
                      than the text on iOS. We should check this when we can. */}
                      <Row width="expand" marginEnd={10}>
                        <Text size={14} weight="light">({product.get('quantity')}) {product.get('title')}</Text>
                      </Row>
                      <Text size={14} weight="normal">
                        {formatPrice(multiply(product.get('quantity'), product.get('price')), 'BRL')}
                      </Text>
                    </Row>
                  </Row>
                </Touchable>
              )}
            </ForEach>
          </Column>
        </ScrollView>
      </Column>
      <Row
        height={70}
        paddingHorizontal={16}
        crossAxisAlignment="center"
        backgroundColor="#FFFFFF"
        borderColor="#e3e3e3"
        borderWidth={1}
        width="expand"
        mainAxisAlignment="spaceBetween"
      >
        <Column>
          <Text size={14} weight="light">Total</Text>
          <Text color="#008000">{formatPrice(cart.get('total'), 'BRL')}</Text>
        </Column>
        <Button text="Buy" onPress={navigator.push(Address)} />
      </Row>
    </>
  )

  return (
    <ScreenComponent title="Cart" state={isLoading}>
      <Column width="expand" height="expand" backgroundColor="#EEEEEE">
        <Lifecycle onInit={onInit}>
          <Loading isLoading={isLoading}>
            <If condition={isEmpty(cart.get('products'))}>
              <Then>{emptyCartView}</Then>
              <Else>{cartView}</Else>
            </If>
          </Loading>
        </Lifecycle>
      </Column>
    </ScreenComponent>
  )
}
