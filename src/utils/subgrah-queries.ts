import gql from 'graphql-tag'

export const epochDetailFragment = gql`
  fragment EpochDetail on Epoch {
    id
    inclusionBlockNumber
    startBlockNumber
    completeBlockNumber
    startTime
  }
`

export const GET_RECENT_EPOCHS = gql`
  query GetRecentEpochs($total: Int) {
    epoches(first: $total, orderBy: id, orderDirection: desc) {
      ...EpochDetail
    }
  }
  ${epochDetailFragment}
`

export const SUBSCRIBE_RECENT_EPOCHS = gql`
  subscription GetRecentEpochs($total: Int) {
    epoches(first: $total, orderBy: id, orderDirection: desc) {
      ...EpochDetail
    }
  }
  ${epochDetailFragment}
`

export const ENIGMA_STATE_QUERY = gql`
  query GetEnigmaState {
    enigmaState(id: 0) {
      epochSize
      latestEpoch {
        ...EpochDetail
      }
    }
  }
  ${epochDetailFragment}
`

export const GET_TASKS_BY_STATE_IN_BLOCK_RANGE = gql`
  query tasksList($from: Int, $to: Int, $status: String) {
    tasks(where: { createdAtBlock_gte: $from, createdAtBlock_lte: $to, status: $status }) {
      id
    }
  }
`

export const SUBSCRIBE_TASKS_BY_STATE_IN_BLOCK_RANGE = gql`
  subscription tasksList($from: Int, $to: Int, $status: String) {
    tasks(where: { createdAtBlock_gte: $from, createdAtBlock_lte: $to, status: $status }) {
      id
    }
  }
`

export const basicTaskDetailsFragment = gql`
  fragment BasicTaskDetails on Task {
    id
    sender
    createdAtTransaction
    createdAt
    status
  }
`
export const GET_RECENT_TASKS = gql`
  query recentTasks($total: Int) {
    tasks(first: $total, orderBy: createdAtBlock, orderDirection: desc) {
      ...BasicTaskDetails
    }
  }
  ${basicTaskDetailsFragment}
`

export const SUBSCRIBE_RECENT_TASKS = gql`
  subscription recentTasks($total: Int) {
    tasks(first: $total, orderBy: createdAtBlock, orderDirection: desc) {
      ...BasicTaskDetails
    }
  }
  ${basicTaskDetailsFragment}
`

export const secretContractDetailFragment = gql`
  fragment SecretContractDetail on SecretContract {
    id
    address
    codeHash
    initStateDeltaHash
    createdAt
    createdAtBlock
    createdAtTransaction
  }
`
export const SECRET_CONTRACT_QUERY = gql`
  query GetSecretContract {
    secretContracts {
      ...SecretContractDetail
    }
  }
  ${secretContractDetailFragment}
`
