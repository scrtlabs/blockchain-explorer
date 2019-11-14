import numeral from 'numeral'

export const formatNumber = (n: number, decimals = 2) => numeral(n).format(`0,0[.]${''.padStart(decimals, '0')}`)
export const formatStake = (n: number) => formatNumber(n, 8)
export const formatTime = (n: number) => numeral(n).format('00:00:00')
