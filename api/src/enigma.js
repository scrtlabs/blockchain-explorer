import Web3 from 'web3'
import { Enigma } from 'enigma-js/node'
import config from './config/constants'
import getNetworkDetailsBy from './networks'

class EnigmaAPI {
  constructor() {
    // web3
    const url = config.eth.id ? getNetworkDetailsBy('id')(config.eth.id).url : config.eth.url
    this.web3 = new Web3(new Web3.providers.HttpProvider(url))

    // enigma
    this.enigma = new Enigma(
      this.web3,
      config.enigma.enigmaContractAddress,
      config.enigma.enigmaTokenAddress,
      config.enigma.url
    )

    this.enigma.admin()
  }
}

export default new EnigmaAPI()
