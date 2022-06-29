import { NimbusJSX, DynamicExpression, FC, WithChildren, If, Then, Else } from '@zup-it/nimbus-backend-core'
import { Spinner } from '../components/spinner'

interface Props extends WithChildren {
  isLoading: DynamicExpression<boolean>,
}

export const Loading: FC<Props> = ({ isLoading, children }) => (
  <If condition={isLoading}>
    <Then><Spinner style={{ height: 100 }} /></Then>
    <Else><>{children}</></Else>
  </If>
)
