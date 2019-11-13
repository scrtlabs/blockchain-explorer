// list of ethNetworks provided on eth-cli
import ethNetworks from './networks.json'

const UNKNOWN_NAME = 'unknown'
const UNKNOWN_ID = -1

const byId = Object.keys(ethNetworks).reduce((acc, key) => {
  acc[ethNetworks[key].id] = {
    name: key,
    url: ethNetworks[key].url,
    label: ethNetworks[key].label
  }
  return acc
}, {})

const getNetworkDetailsById = id => byId[id] || byId[UNKNOWN_ID]

const getNetworkDetailsByName = name => ethNetworks[name] || ethNetworks[UNKNOWN_NAME]

const getNetworkDetailsBy = by => {
  if (by === 'id') {
    return getNetworkDetailsById
  }
  if (by === 'name') {
    return getNetworkDetailsByName
  }

  throw new Error('invalid selection type')
}

export default getNetworkDetailsBy
