import { RouteMap } from '@zup-it/nimbus-backend-express'
import { Home } from './home'
import { Welcome } from './welcome'

export const routes: RouteMap = {
  '': Welcome,
  '/home': Home,
}
