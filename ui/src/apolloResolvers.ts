import gql from 'graphql-tag'

export const typeDefs = gql`
  enum TaskStatus {
    RecordUndefined
    RecordCreated
    ReceiptVerified
    ReceiptFailedENG
    ReceiptFailedETH
    ReceiptFailedReturn
  }
`
