import Web3 from 'web3'
// import EnigmaContract from './Enigma.json'
import getNetworkDetailsBy from './networks'

export const ENG_DECIMALS = 8

class EthAPI {
  constructor() {
    const { url } = getNetworkDetailsBy('id')(4447)
    this.web3 = new Web3(new Web3.providers.HttpProvider(url))
    global.web3 = this.web3
  }

  getBlockNumber() {
    return this.web3.eth.getBlockNumber()
  }

  async getLatestBlocksTimestamps(numberOfBlocks = 20) {
    const lastBlock = await this.getBlockNumber()
    const latestBlocksNumbers = [...Array(numberOfBlocks).keys()].map(key => lastBlock - key)
    const batch = new this.web3.BatchRequest()

    const whenBlocksTimestamp = latestBlocksNumbers.map(blockNumber => {
      return new Promise(resolve => {
        const request = this.web3.eth.getBlock.request(blockNumber, (error, data) => {
          if (error) {
            resolve(error)
          } else {
            resolve(data)
          }
        })
        batch.add(request)
      })
    })

    batch.execute()

    const blocks = await Promise.all(whenBlocksTimestamp)
    return blocks.map(({ timestamp }) => (timestamp ? timestamp : '')).filter(timestamp => timestamp !== '')
  }
}

export default new EthAPI()
