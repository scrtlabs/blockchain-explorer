import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: 'http://localhost:8000/subgraphs/name/enigmampc/enigma' })

// TODO: enable/fix WS local connection for realtime update
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8001/subgraphs/name/enigmampc/enigma',
//   options: { reconnect: true },
// })
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
//   },
//   httpLink,
//   wsLink,
// )

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

export default client
