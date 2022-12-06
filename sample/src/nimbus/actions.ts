import { createAction } from '@zup-it/nimbus-backend-core'
import { customComponentNamespace } from './components/shared'

export let changeBottomNavigatorRoute = createAction<{ route: string }>(
  "changeBottomNavigatorRoute",
  customComponentNamespace,
)
