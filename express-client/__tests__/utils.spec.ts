import { isWeb, isMobile } from 'src/utils/headers'
import { NimbusHeaders } from 'src/utils/types'

describe('Utils: headers', () => {
  const webHeaders: NimbusHeaders = { 'nimbus-platform': 'WEB' }
  const mobileHeaders: NimbusHeaders = { 'nimbus-platform': 'MOBILE' }

  it('should be a web platform', () => {
    expect(isWeb(webHeaders)).toBe(true)
  })

  it('should not be a web platform', () => {
    expect(isWeb({})).toBe(false)
    expect(isWeb(mobileHeaders)).toBe(false)
  })

  it('should be a mobile platform', () => {
    expect(isMobile(mobileHeaders)).toBe(true)
  })

  it('should not be a mobile platform', () => {
    expect(isMobile({})).toBe(false)
    expect(isMobile(webHeaders)).toBe(false)
  })
})


