import { Expression } from '../../../types'

export interface IfProps {
  condition: Expression<boolean>,
  children: JSX.Element | [JSX.Element, JSX.Element],
}

export interface ThenElseProps {
  children: JSX.Element,
}
