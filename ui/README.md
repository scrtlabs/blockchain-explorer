## Enigma Blockchain Explorer

### Setup

#### Local

1. Update `.env.local` values to match your requirements

2. Install dependencies
```bash
$ yarn
```

3. Start the project
```bash
$ yarn start
```

#### Docker

1. Copy `.env.template` to `.env` and update values to match your requirements

2. Launch `docker-compose up`


#### ENV variables

#### `REACT_APP_SUBGRAPH_HTTP`
HTTP subgraph connection.

_Local Value_: `http://localhost:8000`

---
#### `REACT_APP_SUBGRAPH_WS`
WebSocket subgraph connection.

_Local Value_: `ws://localhost:8001`

---
### `REACT_APP_SUBGRAPH_NAME`
Subgraph to connect the explorer to.

_Local Value_: `enigmampc/enigma`

---
### `REACT_APP_ENIGMA_CONTRACT_ADDRESS`
Enigma Contract address in Ethereum network

_Local Value_: `0x59d3631c86bbe35ef041872d502f218a39fba150`

---
### `REACT_APP_ENIGMA_TOKEN_ADDRESS`
Enigma Token Contract address in Ethereum network

_Local Value_: `0xCfEB869F69431e42cdB54A4F4f105C19C080A601`

---
### `REACT_APP_ENIGMA_RPC_URL`
Enigma p2p network address for RPC calls

_Local Value_: `http://localhost:3346`

---
### `REACT_APP_ENIGMA_API`
Enigma Blockchain Explorer's API endpoint

_Local Value_: `http://localhost:8005`

---
### `REACT_APP_ETHERSCAN_URL`
Etherscan address detail link

_Local Value_: `etherscan.io/address`

---
#### `REACT_APP_ETH_URL`
Blockchain RPC host.

_Local Value_: `http://localhost:9545`

**Note:** If `REACT_APP_ETH_NETWORK_ID` is specified, this value will not be used.

---
#### `REACT_APP_ETH_NETWORK_NAME`
Blockchain network descriptive name.

_Local Value_: `'Enigma Local'`.

**Note:** If `REACT_APP_ETH_NETWORK_ID` is specified, this value will not be used.

---
#### `REACT_APP_ETH_NETWORK_ID`
Blockchain network ID. If set will extract network information from [networks.json](src/utils/networks.json).

_Local Value_: _not set_

**Note:** If specified, `REACT_APP_ETH_URL` && `REACT_APP_ETH_NETWORK_NAME` won't be taken into account.
