import hexRgb from 'hex-rgb'

function rgba(hex: string, a = 1) {
  const { red, green, blue, alpha } = hexRgb(hex)
  return `rgba(${red}, ${green}, ${blue}, ${a !== null ? a : alpha})`
}

const plain = {
  primary: '#fa507b',
  secondary: '#8587A4',
  grey: '#f5f5fb',
  greyDark: '#C5C7D5',
  white: '#ffffff',
  whiteDark: '#fbfbfd',
  black: '#222222',
  blackLight: '#5e5d66',
}

const colors = {
  ...plain,
  whiteTransparent: rgba(plain.white, 0.8),
  primaryTransparentLight: rgba(plain.primary, 0.4),
  secondaryTransparent: rgba(plain.secondary, 0.8),
  secondaryTransparentLight: rgba(plain.secondary, 0.4),
  blackTransparent: rgba(plain.black, 0.6),
}

export default colors
