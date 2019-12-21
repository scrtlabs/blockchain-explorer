import Web3 from 'web3'
import getNetworkDetailsBy from './networks'

export const ENG_DECIMALS = 8

class EthAPI {
  constructor() {
    // web3
    if (process.env.REACT_APP_ETH_NETWORK_ID) {
      const { url } = getNetworkDetailsBy('id')(process.env.REACT_APP_ETH_NETWORK_ID)
      this.web3 = new Web3(new Web3.providers.HttpProvider(url))
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETH_URL))
    }
  }

  getBlockNumber() {
    return this.web3.eth.getBlockNumber()
  }

  async getBlockTimestamp(blockNumber) {
    const block = await this.web3.eth.getBlock(blockNumber)
    return (block && block.timestamp) || '0'
  }

  /**
   * Request timestamp for all the blocks in a list of block numbers
   * @param { number[] } range
   * @returns {Promise<number[]>}
   */
  async getBatchBlocksTimestamps(range) {
    const batch = new this.web3.BatchRequest()

    const blocks = range.map(blockNumber => {
      return new Promise((resolve, reject) => {
        const request = this.web3.eth.getBlock.request(blockNumber, (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
        batch.add(request)
      })
    })

    batch.execute()

    return (await Promise.all(blocks)).map(({ timestamp }) => timestamp)
  }
}

export default new EthAPI()
