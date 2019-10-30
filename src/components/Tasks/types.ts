export enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

export enum FieldToGraph {
  'taskId' = 'id',
  'taskStatus' = 'status',
  'taskEpochNumber' = 'epoch',
  'taskUserAddress' = 'sender',
  'taskScAddress' = 'secretContract',
  'taskEngGasUsed' = 'gasUsed',
  'taskNumber' = 'order',
}

export enum GraphToField {
  'id' = 'taskId',
  'status' = 'taskStatus',
  'epoch' = 'taskEpochNumber',
  'sender' = 'taskUserAddress',
  'secretContract' = 'taskScAddress',
  'gasUsed' = 'taskEngGasUsed',
  'order' = 'taskNumber',
}

export enum TaskStatus {
  'RecordCreated' = 'Submitted',
  'ReceiptVerified' = 'Success',
  'ReceiptFailedENG' = 'Failed',
  'ReceiptFailedETH' = 'Failed',
  'ReceiptFailedReturn' = 'Failed',
  'ReceiptFailed' = 'Failed',
}

export interface TaskBasicData {
  id: string
  status: keyof typeof TaskStatus
  sender: string
  createdAt: string
  modifiedAt: string | null
  createdAtTransaction: string
  order: string
  gasUsed: string
  gasLimit: string
  gasPrice: string
  optionalEthereumContractAddress: string | null
  time: string
  secretContract: {
    address: string
  } | null
  epoch: {
    id: string
  }
}
