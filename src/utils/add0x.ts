const add0x = (hex: string): string => (hex ? (hex.indexOf('0x') === 0 ? hex : `0x${hex}`) : '')

export default add0x
