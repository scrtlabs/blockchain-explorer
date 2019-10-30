import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import gql from 'graphql-tag'
import ethApi from './utils/eth'
import { EpochBasicData } from './components/Epochs/types'

const cache = new InMemoryCache()

const typeDefs = gql`
  extend type Epoch {
    endTime: String!
  }
`

const resolvers = {
  Epoch: {
    endTime: (epoch: EpochBasicData) => ethApi.getBlockTimestamp(epoch.endBlockNumber),
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
