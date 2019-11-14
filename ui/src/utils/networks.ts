// list of ethNetworks provided on eth-cli
import ethNetworks from './networks.json'

const UNKNOWN_NAME = 'unknown'
const UNKNOWN_ID = -1

const byId = (Object.keys(ethNetworks) as Array<keyof typeof ethNetworks>).reduce(
  (acc: { [index: string]: any }, key: keyof typeof ethNetworks) => {
    acc[ethNetworks[key].id] = {
      name: key,
      url: ethNetworks[key].url,
      label: ethNetworks[key].label,
    }
    return acc
  },
  {},
)

const getNetworkDetailsById = (id: number) => byId[id] || byId[UNKNOWN_ID]

const getNetworkDetailsByName = (name: keyof typeof ethNetworks) => ethNetworks[name] || ethNetworks[UNKNOWN_NAME]

const getNetworkDetailsBy = (by: string): Function => {
  if (by === 'id') {
    return getNetworkDetailsById
  }
  if (by === 'name') {
    return getNetworkDetailsByName
  }

  throw new Error('invalid selection type')
}

export default getNetworkDetailsBy
