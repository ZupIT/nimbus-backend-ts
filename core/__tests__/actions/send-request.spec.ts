import { Action } from 'src/model/action'
import { MapStateNode } from 'src/model/state/types'
import { StateNode } from 'src/model/state/state-node'
import { sendRequest, SendRequestParams, request, ResponseState, ErrorState } from 'src/actions/send-request'
import { expectActionToBeCorrect } from './utils'

interface User {
  id: string,
  name: string,
  document: string,
  age: number,
}

interface CompositeOptions {
  id: string,
  user: Omit<User, 'id'>,
}

const properties: SendRequestParams<User> = {
  url: 'https://my-api.com/resource',
  data: { id: 1, name: 'test' },
  headers: { test: 'test' },
  method: 'Put',
  onError: response => new Action({
    name: 'test-error',
    properties: { message: response.get('message') },
  }),
  onSuccess: response => new Action({
    name: 'test-success',
    properties: {
      id: response.get('data').get('id'),
      name: response.get('data').get('name'),
    },
  }),
  onFinish: new Action({ name: 'test-finish' }),
}

describe('Actions', () => {
  describe('sendRequest', () => {
    it('should create action', () => {
      const processed = {
        ...properties,
        onSuccess: properties.onSuccess!(new StateNode('onSuccess') as MapStateNode<ResponseState<User>>),
        onError: properties.onError!(new StateNode('onError') as MapStateNode<ErrorState<unknown>>),
      }
      expectActionToBeCorrect(
        sendRequest({ ...properties }),
        'sendRequest',
        processed,
      )
    })

    it('should compose sendRequest', () => {
      const updateUser = request<User>()
        .compose(({ id, user }: CompositeOptions) => ({ url: `https://api.com/user/${id}`, method: 'Put', data: user }))

      const properties: Parameters<typeof updateUser>[0] = {
        id: '1',
        user: {
          age: 19,
          document: '000',
          name: 'John',
        },
        onSuccess: response => new Action({
          name: 'test',
          properties: {
            name: response.get('data').get('name'),
          },
        }),
      }

      const processed = {
        url: 'https://api.com/user/1',
        method: 'Put',
        data: properties.user,
        onSuccess: properties.onSuccess!(new StateNode('onSuccess') as MapStateNode<ResponseState<User>>),
      }

      expectActionToBeCorrect(updateUser(properties), 'sendRequest', processed)
    })
  })
})
