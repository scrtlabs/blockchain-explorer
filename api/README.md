# Blockchain Explorer API

This API provides the Enigma Blockchain Explorer with information that otherwise would require an excessive amount of processing on client-side.
Also provides a consistent source of information for the Enigma ticker stats.

## Requirements

- Node - v11.15 or greater
- Yarn - 1.19.1
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/) version 1.24.1 or higher.
- [MongoDB](https://www.mongodb.com/download-center/community)

# How to Run

- Copy `.env.example` to `.env` and edit as appropriate.
  - `MONGO_DATABASE` is the MongoDB database name
  - `MONGO_HOST` is the MongoDB host URL
  - `MONGO_PORT` is the MongoDB port
  - `SUBGRAPH_NAME` is the Subgraph Name
  - `SUBGRAPH_HTTP` is the Subgraph HTTP host
  - `SUBGRAPH_WS` is the Subgraph WebSocket host
  - `ETH_NETWORK_ID` is the Ethereum network ID
  - `ETH_URL` is the Ethereum RPC URL
  - `ENIGMA_CONTRACT_ADDRESS` is the Enigma Contract address deployed in the Ethereum network
  - `ENIGMA_TOKEN_ADDRESS` is the Enigma Token Contract address deployed in the Ethereum network
  - `ENIGMA_RPC_URL` is the Enigma p2p network address for RPC calls
  - `ENIGMA_API_PORT` is the Enigma API port

## Without Docker

- Before running, make sure you have up and running:
  - a MongoDB instance, with the proper `MONGO_DATABASE` name set.
  - the [subgraph](https://github.com/enigmampc/subgraph)
- Run `yarn` to install all the required dependencies
- Run `yarn dev` to start the app in 'dev' mode
- If you want to build it before:
  - Run `yarn build` to build the node server
  - Run `yarn start` to start the server
- Access [http://localhost:8005](http://localhost:8005)

## With Docker

- Run `docker-compose up`

## Epoch Collection

The program stores data in the `epochs` collection of the MongoDB as Epoch events are being emitted from the Subgraph.

### Record

```javascript
_ = {
  _id, // automatically generated ID
  epochId, // epoch's ID that correlates with its creation order
  workers // a lookup reference to the `Worker` collection
}
```

See MongoDB documentation for [lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) usage.

## Worker Collection

The program stores data in the `workers` collection of the MongoDB as Epoch events are being emitted from the Subgraph.

### Record

```javascript
_ = {
  _id, // automatically generated ID
  workerId, // worker's ID stored in the subgraph. Is the worker's public address
  epochs // a lookup reference to the `Epoch` collection
}
```

See MongoDB documentation for [lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) usage.

## Ticker Document

The program stores data in the `ticker` document, related to the Enigma ticker financial stats.

### Record

```javascript
_ = {
  _id, // automatically generated ID
  last_updated, // timestamp for the last time value was updated
  market_cap_usd, // market cap in USD for the circulating Enigma supply
  price_usd // price in USD for the ENG token
}
```
