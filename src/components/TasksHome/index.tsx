import React from 'react'
import styled from 'styled-components'
import SectionTitle from '../Common/SectionTitle'
import TaskBlock, { TaskItemProps, TaskStatus } from '../TaskBlock'

const tasks: Array<TaskItemProps> = [
  {
    number: '900565',
    secretContract: '0x85da6ff194ad23304f3b7fe2c7c1a9e728154deadbf92d620c242b0c55a4f961',
    status: TaskStatus.failed,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 2h 6m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6'
  },
  {
    number: '900564',
    secretContract: '0x85da6ff194ad23304f3b7fe2c7c1a9e728154deadbf92d620c242b0c55a4f961',
    status: TaskStatus.submitted,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 4h 10m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6'
  },
  {
    number: '900563',
    secretContract: '0x85da6ff194ad23304f3b7fe2c7c1a9e728154deadbf92d620c242b0c55a4f961',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 4h 12m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6'
  },
  {
    number: '900562',
    secretContract: '0x85da6ff194ad23304f3b7fe2c7c1a9e728154deadbf92d620c242b0c55a4f961',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 6h 6m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6'
  },
  {
    number: '900561',
    secretContract: '0x85da6ff194ad23304f3b7fe2c7c1a9e728154deadbf92d620c242b0c55a4f961',
    status: TaskStatus.success,
    submittedBy: '0xc88591acfebdca2aa0504c0bbfc0d6361feebb42d738a1eaa1917c29c134110b',
    taskID: '0x8c8dc67424e2de539395a5338f68965eb294d4739ab8bda7a8db997523bf8d',
    time: '2d 6h 16m ago',
    txHash: '0x8965eb294d4739ab8bda7a8db9975c8f3bf8d8c8dc67424e2de539395a5338f6'
  }
]

const TasksHome = () => {
  return (
    <>
      <SectionTitle>Tasks</SectionTitle>
      {
        tasks.map((item, index) => {
          return <TaskBlock item={item} key={index} />
        })
      }
    </>
  )
}

export default TasksHome
