import gql from 'graphql-tag'
import { Direction, FieldToGraph } from './types'

const basicTaskDetailsFragment = gql`
  fragment BasicTaskDetails on Task {
    id
    sender
    createdAtTransaction
    createdAt
    modifiedAt
    status
    order
    gasUsed
    gasLimit
    gasPrice
    optionalEthereumContractAddress
    secretContract {
      address
    }
    epoch {
      id
    }
  }
`

export const TASKS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicTaskDetails
    }
    enigmaState(id: 0) {
      taskCount
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_SUBSCRIBE = gql`
  subscription TasksSubscribe($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicTaskDetails
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_BY_USER_ADDRESS_QUERY = gql`
  query TasksByUser($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $sender: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: { sender: $sender }) {
      ...BasicTaskDetails
    }
    enigmaState(id: 0) {
      taskCount
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_BY_SECRET_CONTRACT_QUERY = gql`
  query TasksBySecretContract($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $scAddr: String) {
    tasks(
      first: $total
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { id_not: $scAddr, secretContract: $scAddr }
    ) {
      ...BasicTaskDetails
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_BY_ID_QUERY = gql`
  query TasksById($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $id: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: { id: $id }) {
      ...BasicTaskDetails
    }
    enigmaState(id: 0) {
      taskCount
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.taskNumber,
  orderDirection: Direction.descending,
  scAddr: undefined,
  sender: undefined,
  id: undefined,
}
