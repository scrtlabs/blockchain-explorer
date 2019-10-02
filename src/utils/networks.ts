// list of networks provided on eth-cli
import ethNetworks from './networks.json'

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

const getNetworkDetailsById = (id: number) => byId[id] || byId.enigmaLocal

const getNetworkDetailsByName = (name: keyof typeof ethNetworks) => ethNetworks[name] || ethNetworks.enigmaLocal

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
