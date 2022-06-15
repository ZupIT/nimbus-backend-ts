import { NimbusJSX, Expression, FC, WithChildren } from '@zup-it/nimbus-backend-core'
import { theme } from '../../constants'

// interface DefinitionItemProps extends WithStyle {
//   title: Expression<string>,
//   definition: Expression<string>,
// }

// interface SectionProps extends WithChildren {
//   title?: string
// }

export const DefinitionItem: FC = () => (
  <></>
  // <Container style={style.definitionItem}>
  //   <Text styleId={theme.text.bold} style={titleStyle}>{title}</Text>
  //   <Text>{definition}</Text>
  // </Container>
)

export const Section: FC = () => {
  // const card = <Container style={style.card}>{children}</Container>
  // return title ? (
  //   <>
  //     <Text alignment="CENTER" styleId={theme.text.h4} style={style.sectionTitle}>{title}</Text>
  //     {card}
  //   </>
  // ) : card
  return <></>
}
