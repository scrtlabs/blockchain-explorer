import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'node-fetch'
import WebSocket from 'ws'
import config from './config/constants'

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: config.subgraph.websocketURI,
  options: { reconnect: true },
  webSocketImpl: WebSocket
})

const httpLink = new HttpLink({
  uri: config.subgraph.httpURI,
  fetch
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({ link, cache })

export default client
