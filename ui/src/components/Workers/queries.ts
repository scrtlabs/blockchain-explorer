import gql from 'graphql-tag'
import { Direction, FieldToGraph } from './types'

const basicWorkerFragment = gql`
  fragment BasicWorkerFragment on Worker {
    id
    balance
    epochCount
    completedTaskCount
    failedTaskCount
    reward
    status
  }
`

const globalWorkerStatsFragment = gql`
  fragment GlobalWorkerStatsFragment on EnigmaState {
    latestEpoch {
      id
    }
    workerCount
  }
`

export const WORKERS_QUERY = gql`
  query Workers($total: Int, $skip: Int, $orderBy: Worker_orderBy, $orderDirection: OrderDirection) {
    workers(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicWorkerFragment
    }
    enigmaState(id: 0) {
      ...GlobalWorkerStatsFragment
    }
  }
  ${basicWorkerFragment}
  ${globalWorkerStatsFragment}
`

export const WORKERS_BY_ID_QUERY = gql`
  query WorkersById($total: Int, $skip: Int, $orderBy: Worker_orderBy, $orderDirection: OrderDirection, $id: ID!) {
    workers(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: { id: $id }) {
      ...BasicWorkerFragment
    }
    enigmaState(id: 0) {
      ...GlobalWorkerStatsFragment
    }
  }
  ${basicWorkerFragment}
  ${globalWorkerStatsFragment}
`

export const WORKERS_BY_STATUS_QUERY = gql`
  query WorkersByStatus(
    $total: Int
    $skip: Int
    $orderBy: Worker_orderBy
    $orderDirection: OrderDirection
    $status: String
  ) {
    workers(
      first: $total
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { status: $status }
    ) {
      ...BasicWorkerFragment
    }
    enigmaState(id: 0) {
      ...GlobalWorkerStatsFragment
    }
  }
  ${basicWorkerFragment}
  ${globalWorkerStatsFragment}
`

export const WORKERS_BY_NOT_STATUS_QUERY = gql`
  query WorkersByStatus(
    $total: Int
    $skip: Int
    $orderBy: Worker_orderBy
    $orderDirection: OrderDirection
    $status: String
  ) {
    workers(
      first: $total
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { status_not: $status }
    ) {
      ...BasicWorkerFragment
    }
    enigmaState(id: 0) {
      ...GlobalWorkerStatsFragment
    }
  }
  ${basicWorkerFragment}
  ${globalWorkerStatsFragment}
`

export const WORKERS_INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.workerAddress,
  orderDirection: Direction.descending,
  status: 'Unregistered',
  id: undefined,
}
