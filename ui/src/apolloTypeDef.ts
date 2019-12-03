/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecretContract
// ====================================================

export interface SecretContract_secretContract {
  /**
   *  Number of Tasks using this secret contract
   */
  taskCount: any | null;
  /**
   *  Number of unique Users using this secret contract
   */
  userCount: any | null;
  /**
   *  Number of unique eth contract addresseses called by this secret contract
   */
  ethContractCount: any | null;
  /**
   *  List of unique eth contract addresseses called by this secret contract
   */
  ethContracts: string[] | null;
}

export interface SecretContract {
  secretContract: SecretContract_secretContract | null;
}

export interface SecretContractVariables {
  scAddr: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Epoches
// ====================================================

export interface Epoches_epoches {
  /**
   *  Epoch nonce
   */
  id: string;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  Creation timestamp as seconds
   */
  startTime: any;
  endTime: string;
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Number of unique Users for this Epoch
   */
  userCount: any | null;
  /**
   *  Number of created Tasks
   */
  taskCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  Number of active workers
   */
  workerCount: any;
  /**
   *  ENG gas used during this epoch
   */
  gasUsed: any | null;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface Epoches_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface Epoches_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: Epoches_enigmaState_latestEpoch | null;
}

export interface Epoches {
  epoches: Epoches_epoches[];
  enigmaState: Epoches_enigmaState | null;
}

export interface EpochesVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Epoch_orderBy | null;
  orderDirection?: OrderDirection | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: EpochesSubs
// ====================================================

export interface EpochesSubs_epoches {
  /**
   *  Epoch nonce
   */
  id: string;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  Creation timestamp as seconds
   */
  startTime: any;
  endTime: string;
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Number of unique Users for this Epoch
   */
  userCount: any | null;
  /**
   *  Number of created Tasks
   */
  taskCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  Number of active workers
   */
  workerCount: any;
  /**
   *  ENG gas used during this epoch
   */
  gasUsed: any | null;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface EpochesSubs {
  epoches: EpochesSubs_epoches[];
}

export interface EpochesSubsVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Epoch_orderBy | null;
  orderDirection?: OrderDirection | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: EngStateSubs
// ====================================================

export interface EngStateSubs_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface EngStateSubs_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: EngStateSubs_enigmaState_latestEpoch | null;
}

export interface EngStateSubs {
  enigmaState: EngStateSubs_enigmaState | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Epoch
// ====================================================

export interface Epoch_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  Creation timestamp as seconds
   */
  startTime: any;
  endTime: string;
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Number of unique Users for this Epoch
   */
  userCount: any | null;
  /**
   *  Number of created Tasks
   */
  taskCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  Number of active workers
   */
  workerCount: any;
  /**
   *  ENG gas used during this epoch
   */
  gasUsed: any | null;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface Epoch_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface Epoch_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: Epoch_enigmaState_latestEpoch | null;
}

export interface Epoch {
  epoch: Epoch_epoch | null;
  enigmaState: Epoch_enigmaState | null;
}

export interface EpochVariables {
  epochId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EpochesByWorker
// ====================================================

export interface EpochesByWorker_worker_epochs {
  /**
   *  Epoch nonce
   */
  id: string;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  Creation timestamp as seconds
   */
  startTime: any;
  endTime: string;
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Number of unique Users for this Epoch
   */
  userCount: any | null;
  /**
   *  Number of created Tasks
   */
  taskCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  Number of active workers
   */
  workerCount: any;
  /**
   *  ENG gas used during this epoch
   */
  gasUsed: any | null;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface EpochesByWorker_worker {
  /**
   *  Epochs in which the worker was active
   */
  epochs: EpochesByWorker_worker_epochs[];
  /**
   *  Number of Epochs in which the worker was active
   */
  epochCount: any;
}

export interface EpochesByWorker_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface EpochesByWorker_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: EpochesByWorker_enigmaState_latestEpoch | null;
}

export interface EpochesByWorker {
  worker: EpochesByWorker_worker | null;
  enigmaState: EpochesByWorker_enigmaState | null;
}

export interface EpochesByWorkerVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Epoch_orderBy | null;
  orderDirection?: OrderDirection | null;
  workerId: string;
  epoches?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: EnigmaState
// ====================================================

export interface EnigmaState_enigmaState {
  /**
   *  Number of Workers
   */
  workerCount: any;
  /**
   *  Number of unique Users that have ever interacted with the network
   */
  userCount: any;
  /**
   *  Total ENG staked in Enigma network
   */
  staked: any;
}

export interface EnigmaState {
  enigmaState: EnigmaState_enigmaState | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: StatisticsByTask
// ====================================================

export interface StatisticsByTask_statistics_startedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByTask_statistics_endedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByTask_statistics {
  /**
   *  Equals to: <StatisticType>-order
   */
  id: string;
  /**
   *  Number of Epochs started during this range
   */
  startedEpochCount: any;
  /**
   *  Number of Epochs ended during this range
   */
  endedEpochCount: any;
  /**
   *  Epochs started during this range
   */
  startedEpochs: StatisticsByTask_statistics_startedEpochs[] | null;
  /**
   *  Epochs ended during this range
   */
  endedEpochs: StatisticsByTask_statistics_endedEpochs[] | null;
  /**
   *  Number of Tasks created during this range
   */
  taskCount: any;
  /**
   *  Number of Tasks completed during this range
   */
  completedTaskCount: any;
  /**
   *  Number of Tasks failed during this range
   */
  failedTaskCount: any;
}

export interface StatisticsByTask {
  statistics: StatisticsByTask_statistics[];
}

export interface StatisticsByTaskVariables {
  total?: number | null;
  since?: any | null;
  type?: StatisticType | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: StatisticsByUser
// ====================================================

export interface StatisticsByUser_statistics_startedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByUser_statistics_endedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByUser_statistics {
  /**
   *  Equals to: <StatisticType>-order
   */
  id: string;
  /**
   *  Number of Epochs started during this range
   */
  startedEpochCount: any;
  /**
   *  Number of Epochs ended during this range
   */
  endedEpochCount: any;
  /**
   *  Epochs started during this range
   */
  startedEpochs: StatisticsByUser_statistics_startedEpochs[] | null;
  /**
   *  Epochs ended during this range
   */
  endedEpochs: StatisticsByUser_statistics_endedEpochs[] | null;
  /**
   *  Number of unique users addresses interacting in this range
   */
  userCount: any;
  /**
   *  List of unique users addresses interacting in this range
   */
  users: string[] | null;
}

export interface StatisticsByUser {
  statistics: StatisticsByUser_statistics[];
}

export interface StatisticsByUserVariables {
  total?: number | null;
  since?: any | null;
  type?: StatisticType | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: StatisticsByWorker
// ====================================================

export interface StatisticsByWorker_statistics_startedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByWorker_statistics_endedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsByWorker_statistics_workers {
  /**
   *  Equals to: <custodianAddress>
   */
  id: string;
}

export interface StatisticsByWorker_statistics {
  /**
   *  Equals to: <StatisticType>-order
   */
  id: string;
  /**
   *  Number of Epochs started during this range
   */
  startedEpochCount: any;
  /**
   *  Number of Epochs ended during this range
   */
  endedEpochCount: any;
  /**
   *  Epochs started during this range
   */
  startedEpochs: StatisticsByWorker_statistics_startedEpochs[] | null;
  /**
   *  Epochs ended during this range
   */
  endedEpochs: StatisticsByWorker_statistics_endedEpochs[] | null;
  /**
   *  Number of unique active workers during this range
   */
  workerCount: any;
  /**
   *  Unique active workers in the epoch during this range
   */
  workers: StatisticsByWorker_statistics_workers[] | null;
}

export interface StatisticsByWorker {
  statistics: StatisticsByWorker_statistics[];
}

export interface StatisticsByWorkerVariables {
  total?: number | null;
  since?: any | null;
  type?: StatisticType | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tasks
// ====================================================

export interface Tasks_tasks_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface Tasks_tasks_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface Tasks_tasks {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: Tasks_tasks_secretContract | null;
  /**
   *  Epoch
   */
  epoch: Tasks_tasks_epoch | null;
}

export interface Tasks_enigmaState {
  /**
   *  Number of created Tasks
   */
  taskCount: any;
}

export interface Tasks {
  tasks: Tasks_tasks[];
  enigmaState: Tasks_enigmaState | null;
}

export interface TasksVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Task_orderBy | null;
  orderDirection?: OrderDirection | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: TasksSubscribe
// ====================================================

export interface TasksSubscribe_tasks_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface TasksSubscribe_tasks_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface TasksSubscribe_tasks {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: TasksSubscribe_tasks_secretContract | null;
  /**
   *  Epoch
   */
  epoch: TasksSubscribe_tasks_epoch | null;
}

export interface TasksSubscribe {
  tasks: TasksSubscribe_tasks[];
}

export interface TasksSubscribeVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Task_orderBy | null;
  orderDirection?: OrderDirection | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TasksByUser
// ====================================================

export interface TasksByUser_tasks_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface TasksByUser_tasks_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface TasksByUser_tasks {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: TasksByUser_tasks_secretContract | null;
  /**
   *  Epoch
   */
  epoch: TasksByUser_tasks_epoch | null;
}

export interface TasksByUser_enigmaState {
  /**
   *  Number of created Tasks
   */
  taskCount: any;
}

export interface TasksByUser {
  tasks: TasksByUser_tasks[];
  enigmaState: TasksByUser_enigmaState | null;
}

export interface TasksByUserVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Task_orderBy | null;
  orderDirection?: OrderDirection | null;
  sender?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TasksBySecretContract
// ====================================================

export interface TasksBySecretContract_tasks_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface TasksBySecretContract_tasks_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface TasksBySecretContract_tasks {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: TasksBySecretContract_tasks_secretContract | null;
  /**
   *  Epoch
   */
  epoch: TasksBySecretContract_tasks_epoch | null;
}

export interface TasksBySecretContract {
  tasks: TasksBySecretContract_tasks[];
}

export interface TasksBySecretContractVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Task_orderBy | null;
  orderDirection?: OrderDirection | null;
  notId?: string | null;
  scAddr?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TasksById
// ====================================================

export interface TasksById_tasks_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface TasksById_tasks_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface TasksById_tasks {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: TasksById_tasks_secretContract | null;
  /**
   *  Epoch
   */
  epoch: TasksById_tasks_epoch | null;
}

export interface TasksById_enigmaState {
  /**
   *  Number of created Tasks
   */
  taskCount: any;
}

export interface TasksById {
  tasks: TasksById_tasks[];
  enigmaState: TasksById_enigmaState | null;
}

export interface TasksByIdVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Task_orderBy | null;
  orderDirection?: OrderDirection | null;
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkerById
// ====================================================

export interface WorkerById_worker_epochs_workers {
  /**
   *  Equals to: <custodianAddress>
   */
  id: string;
}

export interface WorkerById_worker_epochs {
  /**
   *  Order number
   */
  order: any;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  The random integer generated by the enclave
   */
  seed: any;
  /**
   *  Active workers in the epoch
   */
  workers: WorkerById_worker_epochs_workers[];
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Deployed secret contract until this epoch
   */
  deployedSecretContracts: string[] | null;
}

export interface WorkerById_worker {
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  ENG reward
   */
  reward: any | null;
  /**
   *  ENG balance of worker
   */
  balance: any;
  /**
   *  Number of Epochs in which the worker was active
   */
  epochCount: any;
  /**
   *  Epochs in which the worker was active
   */
  epochs: WorkerById_worker_epochs[];
}

export interface WorkerById_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface WorkerById_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: WorkerById_enigmaState_latestEpoch | null;
}

export interface WorkerById {
  worker: WorkerById_worker | null;
  enigmaState: WorkerById_enigmaState | null;
}

export interface WorkerByIdVariables {
  workerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workers
// ====================================================

export interface Workers_workers {
  /**
   *  Equals to: <custodianAddress>
   */
  id: string;
  /**
   *  ENG balance of worker
   */
  balance: any;
  /**
   *  Number of Epochs in which the worker was active
   */
  epochCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface Workers_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface Workers_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: Workers_enigmaState_latestEpoch | null;
  /**
   *  Number of Workers
   */
  workerCount: any;
}

export interface Workers {
  workers: Workers_workers[];
  enigmaState: Workers_enigmaState | null;
}

export interface WorkersVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Worker_orderBy | null;
  orderDirection?: OrderDirection | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkersById
// ====================================================

export interface WorkersById_workers {
  /**
   *  Equals to: <custodianAddress>
   */
  id: string;
  /**
   *  ENG balance of worker
   */
  balance: any;
  /**
   *  Number of Epochs in which the worker was active
   */
  epochCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  ENG reward
   */
  reward: any | null;
}

export interface WorkersById_enigmaState_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface WorkersById_enigmaState {
  /**
   *  Most recent epoch
   */
  latestEpoch: WorkersById_enigmaState_latestEpoch | null;
  /**
   *  Number of Workers
   */
  workerCount: any;
}

export interface WorkersById {
  workers: WorkersById_workers[];
  enigmaState: WorkersById_enigmaState | null;
}

export interface WorkersByIdVariables {
  total?: number | null;
  skip?: number | null;
  orderBy?: Worker_orderBy | null;
  orderDirection?: OrderDirection | null;
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EpochsDetails
// ====================================================

export interface EpochsDetails {
  /**
   *  Epoch nonce
   */
  id: string;
  /**
   *  Locally-computed first block number of epoch
   */
  startBlockNumber: any;
  /**
   *  End block number of epoch
   */
  endBlockNumber: any;
  /**
   *  Creation timestamp as seconds
   */
  startTime: any;
  endTime: string;
  /**
   *  Active workers stakes in the epoch
   */
  stakes: any[] | null;
  /**
   *  Number of unique Users for this Epoch
   */
  userCount: any | null;
  /**
   *  Number of created Tasks
   */
  taskCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  Number of active workers
   */
  workerCount: any;
  /**
   *  ENG gas used during this epoch
   */
  gasUsed: any | null;
  /**
   *  ENG reward
   */
  reward: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LatestEpoch
// ====================================================

export interface LatestEpoch_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface LatestEpoch {
  /**
   *  Most recent epoch
   */
  latestEpoch: LatestEpoch_latestEpoch | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StatisticsCommonFragment
// ====================================================

export interface StatisticsCommonFragment_startedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsCommonFragment_endedEpochs {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface StatisticsCommonFragment {
  /**
   *  Equals to: <StatisticType>-order
   */
  id: string;
  /**
   *  Number of Epochs started during this range
   */
  startedEpochCount: any;
  /**
   *  Number of Epochs ended during this range
   */
  endedEpochCount: any;
  /**
   *  Epochs started during this range
   */
  startedEpochs: StatisticsCommonFragment_startedEpochs[] | null;
  /**
   *  Epochs ended during this range
   */
  endedEpochs: StatisticsCommonFragment_endedEpochs[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicTaskDetails
// ====================================================

export interface BasicTaskDetails_secretContract {
  /**
   *  Contract address
   */
  address: any;
}

export interface BasicTaskDetails_epoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface BasicTaskDetails {
  /**
   *  Task ID
   */
  id: string;
  /**
   *  Sender address
   */
  sender: any;
  /**
   *  Creation transaction hash
   */
  createdAtTransaction: any;
  /**
   *  Creation timestamp as seconds
   */
  createdAt: any;
  /**
   *  Last status change (complete or fail) timestamp as seconds
   */
  modifiedAt: any | null;
  /**
   *  Task status
   */
  status: string;
  /**
   *  Order number
   */
  order: any;
  /**
   *  ENG gas used
   */
  gasUsed: any | null;
  /**
   *  ENG gas limit units
   */
  gasLimit: any;
  /**
   *  ENG gas px in grains (10 ** 8) amount
   */
  gasPrice: any;
  /**
   *  Ethereum contract address
   */
  optionalEthereumContractAddress: any | null;
  /**
   *  Secret contract address
   */
  secretContract: BasicTaskDetails_secretContract | null;
  /**
   *  Epoch
   */
  epoch: BasicTaskDetails_epoch | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicWorkerFragment
// ====================================================

export interface BasicWorkerFragment {
  /**
   *  Equals to: <custodianAddress>
   */
  id: string;
  /**
   *  ENG balance of worker
   */
  balance: any;
  /**
   *  Number of Epochs in which the worker was active
   */
  epochCount: any;
  /**
   *  Number of completed Tasks
   */
  completedTaskCount: any;
  /**
   *  Number of failed Tasks
   */
  failedTaskCount: any;
  /**
   *  ENG reward
   */
  reward: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GlobalWorkerStatsFragment
// ====================================================

export interface GlobalWorkerStatsFragment_latestEpoch {
  /**
   *  Epoch nonce
   */
  id: string;
}

export interface GlobalWorkerStatsFragment {
  /**
   *  Most recent epoch
   */
  latestEpoch: GlobalWorkerStatsFragment_latestEpoch | null;
  /**
   *  Number of Workers
   */
  workerCount: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Epoch_orderBy {
  completedTaskCount = "completedTaskCount",
  deployedSecretContracts = "deployedSecretContracts",
  endBlockNumber = "endBlockNumber",
  failedTaskCount = "failedTaskCount",
  gasUsed = "gasUsed",
  id = "id",
  inclusionBlockNumber = "inclusionBlockNumber",
  order = "order",
  reward = "reward",
  seed = "seed",
  stakes = "stakes",
  startBlockNumber = "startBlockNumber",
  startTime = "startTime",
  taskCount = "taskCount",
  tasks = "tasks",
  userCount = "userCount",
  users = "users",
  workerCount = "workerCount",
  workers = "workers",
}

export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export enum StatisticType {
  DAY = "DAY",
  HOUR = "HOUR",
}

export enum Task_orderBy {
  createdAt = "createdAt",
  createdAtBlock = "createdAtBlock",
  createdAtTransaction = "createdAtTransaction",
  epoch = "epoch",
  gasLimit = "gasLimit",
  gasPrice = "gasPrice",
  gasUsed = "gasUsed",
  id = "id",
  inputsHash = "inputsHash",
  modifiedAt = "modifiedAt",
  modifiedAtBlock = "modifiedAtBlock",
  modifiedAtTransaction = "modifiedAtTransaction",
  optionalEthereumContractAddress = "optionalEthereumContractAddress",
  order = "order",
  outputHash = "outputHash",
  secretContract = "secretContract",
  sender = "sender",
  status = "status",
  worker = "worker",
}

export enum Worker_orderBy {
  balance = "balance",
  completedTaskCount = "completedTaskCount",
  createdAt = "createdAt",
  createdAtBlock = "createdAtBlock",
  createdAtTransaction = "createdAtTransaction",
  custodianAddress = "custodianAddress",
  epochCount = "epochCount",
  epochs = "epochs",
  failedTaskCount = "failedTaskCount",
  id = "id",
  logs = "logs",
  reward = "reward",
  signerAddress = "signerAddress",
  status = "status",
  tasks = "tasks",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
