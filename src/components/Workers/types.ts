export enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

export enum FieldToGraph {
  'workerAddress' = 'id',
  'workerStackedEng' = 'balance',
  'workerActiveVsTotal' = 'epochCount',
  'workerCompletedTasks' = 'completedTaskCount',
  'workerEngReward' = 'reward',
}

export enum GraphToField {
  'id' = 'workerAddress',
  'balance' = 'workerStackedEng',
  'epochCount' = 'workerActiveVsTotal',
  'completedTaskCount' = 'workerCompletedTasks',
  'reward' = 'workerEngReward',
}

export interface WorkerBasicData {
  id: string
  balance: string
  epochCount: string
  completedTaskCount: string
  failedTaskCount: string
  reward: string
  enigmaState: {
    latestEpoch: {
      id: string
    }
    workerCount: string
  }
}
