import { mapValues } from 'lodash'
import * as layout from 'src'

describe('Layout module', () => {
  it('should export', () => expect(mapValues(layout, v => typeof v)).toMatchSnapshot())
})
