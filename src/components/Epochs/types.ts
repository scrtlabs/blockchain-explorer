import { EpochBlockTypes } from '../EpochBlockNumbers'

export enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

export enum FieldToGraph {
  'epochId' = 'order',
  'epochAge' = 'age',
  'epochTotalTasks' = 'taskCount',
  'epochCompleteTasks' = 'completedTaskCount',
  'epochWorkers' = 'workerCount',
  'epochEngGasUsed' = 'gasUsed',
  'epochEngReward' = 'reward',
}

export enum GraphToField {
  'order' = 'epochId',
  'age' = 'epochAge',
  'taskCount' = 'epochTotalTasks',
  'completedTaskCount' = 'epochCompleteTasks',
  'workerCount' = 'epochWorkers',
  'gasUsed' = 'epochEngGasUsed',
  'reward' = 'epochEngReward',
}

export interface EpochBlocksInfoProps {
  value: string | number
  title: string
  type: EpochBlockTypes
}

export interface EpochBasicData {
  id: string
  startBlockNumber: string
  endBlockNumber: string
  startTime: string
  endTime: string
  stakes: string[]
  taskCount: string
  completedTaskCount: string
  failedTaskCount: string
  workerCount: string
  userCount: string
  gasUsed: string
  reward: string
}
