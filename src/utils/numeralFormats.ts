import numeral from 'numeral'

export const formatStake = (n: number, decimals = 8) => numeral(n).format(`0,0[.]${''.padStart(decimals, '0')}`)
export const formatNumber = (n: number) => numeral(n).format('0,0[.]00')
export const formatTime = (n: number) => numeral(n).format('00:00:00')
