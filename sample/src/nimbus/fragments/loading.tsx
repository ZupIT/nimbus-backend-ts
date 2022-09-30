import { NimbusJSX, DynamicExpression, FC, WithChildren, If, Then, Else } from '@zup-it/nimbus-backend-core'
import { Column, Row } from '@zup-it/nimbus-backend-layout'
import { Spinner } from '../components/spinner'

interface Props {
  isLoading: DynamicExpression<boolean>,
  children: JSX.Element | JSX.Element[],
}

export const Loading: FC<Props> = ({ isLoading, children }) => (
  <If condition={isLoading}>
    <Then>
      <Column width="expand" height="expand" mainAxisAlignment="center" crossAxisAlignment="center">
        <Spinner />
      </Column>
    </Then>
    <Else>
      {children}
    </Else>
  </If>
)
