import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { typeDefs } from './apolloResolvers'

const httpLink = new HttpLink({ uri: 'http://localhost:8000/subgraphs/name/enigmampc/enigma' })

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8001/subgraphs/name/enigmampc/enigma',
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

const client = new ApolloClient({ link, cache: new InMemoryCache(), typeDefs })

export default client
