import getNetworkDetailsBy from './networks'

const { name: networkName } = getNetworkDetailsBy('id')(process.env.REACT_APP_ETH_NETWORK_ID)

const getExternalLink = (ethContract: string) => {
  const subdomain = ['mainnet', 'local', 'unknown'].includes(networkName) ? '' : `${networkName}.`
  return `https://${subdomain}${process.env.REACT_APP_ETHERSCAN_URL}/${ethContract}`
}

export default getExternalLink
