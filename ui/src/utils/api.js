import { formatNumber } from './numeralFormats'

export const cryptoCompare = async () => {
  const url = new URL('https://min-api.cryptocompare.com/data/pricemultifull')
  const params = {
    fsyms: 'ENG',
    tsyms: 'USD',
  }
  url.search = new URLSearchParams(params).toString()
  const {
    RAW: {
      ENG: {
        USD: { PRICE, MKTCAP },
      },
    },
  } = await (await fetch(url)).json().catch(console.error)

  return {
    price: formatNumber(PRICE, 4),
    marketCap: formatNumber(MKTCAP, 0),
  }
}

export const coinMarketCap = async () => {
  const url = new URL('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest')
  const params = {
    id: 2044,
  }
  url.search = new URLSearchParams(params).toString()
  const headers = new Headers({
    'X-CMC_PRO_API_KEY': process.env.REACT_APP_COINMARKET_CAP_API_KEY,
  })
  const init = {
    method: 'GET',
    headers,
    cache: 'default',
  }
  const request = new Request(url, init)
  const response = await (await fetch(request)).json()

  if (response.error_code) throw new Error(response.error_message)

  const {
    data: {
      [params.id]: {
        quote: {
          USD: { market_cap, price },
        },
      },
    },
  } = response

  return {
    price: formatNumber(price, 4),
    marketCap: formatNumber(market_cap, 0),
  }
}

export const binance = async () => {
  const binanceURL = 'https://api.binance.com/api/v1/ticker/price?symbol='
  const { price } = await (await fetch(`${binanceURL}ENGBTC`)).json().catch()

  return {
    price: formatNumber(price, 4),
    marketCap: '',
  }
}

export const enigmaTicker = async () => {
  const enigmaAPIURL = `${process.env.REACT_APP_ENIGMA_API}/ticker`
  const response = await fetch(enigmaAPIURL, { mode: 'no-cors' })
  const ticker = { priceUsd: '0', marketCapUsd: '0' }

  if (response.ok) {
    const { price_usd, market_cap_usd } = await response.json()
    ticker.priceUsd = price_usd
    ticker.marketCapUsd = market_cap_usd
  }

  return {
    price: formatNumber(+ticker.price_usd, 4),
    marketCap: formatNumber(+ticker.market_cap_usd, 0),
  }
}
