import gql from 'graphql-tag'
import { Direction, FieldToGraph } from './types'

const epochesDetailsFragment = gql`
  fragment EpochsDetails on Epoch {
    id
    startBlockNumber
    endBlockNumber
    startTime
    endTime @client
    stakes
    userCount
    taskCount
    completedTaskCount
    failedTaskCount
    workerCount
    gasUsed
    reward
  }
`

const latestEpochFragment = gql`
  fragment LatestEpoch on EnigmaState {
    latestEpoch {
      id
    }
  }
`

export const EPOCHS_QUERY = gql`
  query Epoches($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    epoches(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...EpochsDetails
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

export const EPOCHS_SUBSCRIPTION = gql`
  subscription EpochesSubs($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    epoches(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...EpochsDetails
    }
  }
  ${epochesDetailsFragment}
`

export const ENG_STATE_SUBSCRIPTION = gql`
  subscription EngStateSubs {
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${latestEpochFragment}
`

export const EPOCH_BY_ID_QUERY = gql`
  query Epoch($epochId: String) {
    epoch(id: $epochId) {
      ...EpochsDetails
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

export const EPOCHS_BY_WORKER_QUERY = gql`
  query EpochesByWorker(
    $total: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $workerId: String
    $epoches: [ID!]
  ) {
    worker(id: $workerId) {
      epochs(
        first: $total
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: { id_in: $epoches }
      ) {
        ...EpochsDetails
      }
      epochCount
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

export const EPOCHS_INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.epochId,
  orderDirection: Direction.descending,
  workerId: undefined,
  epochId: undefined,
  epoches: [],
}
