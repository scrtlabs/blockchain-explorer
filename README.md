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

1. Update `.env.local` values to match your requirements

2. Launch `docker-compose up`


#### ENV variables

#### `REACT_APP_SUBGRAPH_HTTP_URL`
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
