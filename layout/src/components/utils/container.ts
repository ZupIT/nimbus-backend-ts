import { ContainerStyle } from '../types/container'

export const buildContainerStyle = (style?: ContainerStyle): ContainerStyle => ({
  stretch: false,
  crossAxisAlignment: 'start',
  mainAxisAlignment: 'start',
  ...(style ?? {}),
})
