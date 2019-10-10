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
