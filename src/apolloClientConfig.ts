import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import gql from 'graphql-tag'
import JSBI from 'jsbi'
import ethApi from './utils/eth'
import { EpochBasicData } from './components/Epochs/types'

const cache = new InMemoryCache()

const typeDefs = gql`
  extend type Epoch {
    endTime: String!
    selectedWorkers: [String!]!
  }
`

const resolvers = {
  Epoch: {
    endTime: (epoch: EpochBasicData) => ethApi.getBlockTimestamp(epoch.endBlockNumber),
    selectedWorkers: (epoch: EpochBasicData) => {
      const params = {
        firstBlockNumber: parseInt(epoch.startBlockNumber),
        seed: JSBI.BigInt(epoch.seed),
        workers: epoch.workers.map(({ id }) => id),
        stakes: epoch.stakes.map(stake => JSBI.BigInt(stake)),
      }

      return Array.from(
        new Set(
          epoch.deployedSecretContracts.map(
            scAddr => ethApi.enigma.selectWorkerGroup(scAddr, params, params.workers.length)[0],
          ),
        ),
      )
    },
  },
}

const subgraphName = `subgraphs/name/${process.env.REACT_APP_SUBGRAPH_NAME}`

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SUBGRAPH_HTTP}/${subgraphName}` })

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_SUBGRAPH_WS}/${subgraphName}`,
  options: { reconnect: true },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({ link, cache, typeDefs, resolvers })

export default client
