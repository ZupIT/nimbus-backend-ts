import { NimbusJSX } from '../../../jsx'
import { FC, Actions, Component } from '../../../api'
import { genericNamespace } from '../../../constants'
import { WithAccessibility } from '../../../model/component'

export interface TouchableProps extends WithAccessibility {
  onPress: Actions,
  children: Component[],
}

export const Touchable: FC<TouchableProps> = ({ children, ...props }) => (
  <component name="touchable" namespace={genericNamespace} properties={props}>{children}</component>
)
