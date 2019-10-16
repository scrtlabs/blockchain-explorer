import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import TaskBlock, { TaskItemProps, TaskStatus } from '../TaskBlock'
import { useQuery } from '@apollo/react-hooks'
import { GET_RECENT_TASKS } from '../../utils/subgrah-queries'
import shrinkHexString from '../../utils/shrinkHexString'
import { shortEngHumanizer } from '../../utils/humanizer'

const _tasks: Array<TaskItemProps> = [
  {
    number: '900565',
    status: TaskStatus.failed,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 2h 6m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6',
  },
  {
    number: '900564',
    status: TaskStatus.submitted,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 4h 10m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6',
  },
  {
    number: '900563',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 4h 12m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6',
  },
  {
    number: '900562',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 6h 6m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6',
  },
  {
    number: '900561',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 6h 16m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6',
  },
]

export interface TaskBasicData {
  id: string
  status: string
  sender: string
  createdAt: string
  createdAtTransaction: string
}

const TasksHome = () => {
  const { data, error, loading } = useQuery(GET_RECENT_TASKS, { variables: { total: 5 } })
  const [tasks, setTasks] = React.useState(_tasks)

  React.useMemo(() => {
    if (!loading && !error) {
      setTasks(
        data.tasks.map((task: TaskBasicData) => ({
          number: shrinkHexString(task.id, 2, 3),
          status: task.status === 'RecordCreated' ? 1 : 0, // TODO: fix
          submittedBy: task.sender,
          taskID: task.id,
          time: shortEngHumanizer(Date.now() - (new Date(+task.createdAt * 1000) as any)) + ' ago',
          txHash: task.createdAtTransaction,
        })),
      )
    }
  }, [loading])

  return (
    <>
      <SectionTitle>Tasks</SectionTitle>
      {tasks.map((item, index) => {
        return <TaskBlock item={item} key={index} />
      })}
    </>
  )
}

export default TasksHome
