import { agent, Response } from 'supertest'
import { expressApp, expressListener } from '../src'

function makeRequest(route: string) {
  return new Promise<Response>((resolve, reject) => {
    agent(expressApp)
      .get(`${route}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, resp) => {
        if (err) reject(err)
        else resolve(resp)
      })
  })
}

async function expectRouteToMatchSnapshot(route: string) {
  const resp = await makeRequest(route)
  expect(resp.body).toMatchSnapshot()
}

describe('Verifies if the screens outputs match the snapshots', () => {
  afterAll(() => expressListener.close())

  it('should render the products screen', () => expectRouteToMatchSnapshot('/products'))

  it('should render the product screen', () => expectRouteToMatchSnapshot('/product'))

  it('should render the cart screen', () => expectRouteToMatchSnapshot('/cart'))

  it('should render the address screen', () => expectRouteToMatchSnapshot('/address'))

  it('should render the payment screen', () => expectRouteToMatchSnapshot('/payment'))

  it('should render the orders screen', () => expectRouteToMatchSnapshot('/orders'))

  it('should render the order screen', () => expectRouteToMatchSnapshot('/order'))
})
