# Enigma Blockchain Explorer

This project contains the [Enigma Blockchain Explorer](./ui) itself, and the [Enigma Blockchain Explorer API](./api) which provides the Enigma Blockchain Explorer with extra information.

## Requirements

- Node - v11.15 or greater
- Yarn - 1.19.1
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/) version 1.24.1 or higher.
- [MongoDB](https://www.mongodb.com/download-center/community)

# How to Run

## General
- Copy [`./.env.template`](./.env.template) to `./.env` and edit as appropriate.
  - `BLOCK_EXPLORER_PORT` this is Explorer UI port
  - `BLOCK_EXPLORER_API_PORT` this is Explorer API port
  - `BLOCK_EXPLORER_DB_PORT` this is Explorer API Database port

## API
- Copy [`./api/.env.template`](./api/.env.template) to `./api/.env` and edit as appropriate.
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

## UI
- Copy [`./ui/.env.template`](./ui/.env.template) to `./ui/.env` and edit as appropriate.
  - `REACT_APP_SUBGRAPH_HTTP` is the HTTP subgraph connection
  - `REACT_APP_SUBGRAPH_WS` is the WebSocket subgraph connection
  - `REACT_APP_SUBGRAPH_NAME` is the Subgraph name
  - `REACT_APP_ENIGMA_CONTRACT_ADDRESS` is the Enigma Contract address in Ethereum network
  - `REACT_APP_ENIGMA_TOKEN_ADDRESS` is the Enigma Token Contract address in Ethereum network
  - `REACT_APP_ENIGMA_RPC_URL` is the Enigma p2p network address for RPC calls
  - `REACT_APP_ENIGMA_API` is the # Required. Default: <undefined>
  - `REACT_APP_ETHERSCAN_URL` is the Etherscan address detail link
  - `REACT_APP_ETH_NETWORK_ID` is the Blockchain network ID
  - `REACT_APP_ETH_URL` is the Blockchain RPC host
  - `REACT_APP_ETH_NETWORK_NAME` is the Blockchain network descriptive name

## Without Docker

- Before running, make sure you have up and running:
  - a MongoDB instance, with the proper `MONGO_DATABASE` name set.
  - the [subgraph](https://github.com/enigmampc/subgraph)
- On [`./api`](./api):
  - Run `yarn` to install all the required dependencies
  - Run `yarn dev` to start the server in 'dev' mode
  - If you want to build it before serve it:
    - Run `yarn build` to build the node server
    - Run `yarn start` to start the server
  - Access [http://localhost:8005](http://localhost:8005)
- On [`./ui`](./ui):
  - Run `yarn` to install all the required dependencies
  - Run `yarn start` to start the server
  - Access [http://localhost:8008](http://localhost:8008)

## With Docker
- Copy [`./.env.template`](./.env.template) to `./.env` and edit as appropriate.
- Copy [`./api/.env.template`](./api/.env.template) to `./api/.env` and edit as appropriate.
- Copy [`./ui/.env.template`](./ui/.env.template) to `./ui/.env` and edit as appropriate.
- NOTE: If you need to wipe out the previous database volume, be sure to remove the `./data` directory before running docker
```shell script
$ sudo rm -rf ./data
```
- Run `docker-compose up --build`
