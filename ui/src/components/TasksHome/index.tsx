import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import TaskBlock from '../TaskBlock'
import { useSubscription } from '@apollo/react-hooks'
import { TASKS_INITIAL_VALUES, TASKS_SUBSCRIBE } from 'components/Tasks/queries'
import { TaskBasicData } from 'components/Tasks/types'

const TasksHome = (props: any) => {
  const { data, error } = useSubscription(TASKS_SUBSCRIBE, {
    variables: { ...TASKS_INITIAL_VALUES, total: 5 },
  })

  if (error) console.error(error.message)

  return (
    <>
      <SectionTitle>Tasks</SectionTitle>
      {data &&
        data.tasks.map((task: TaskBasicData) => {
          return <TaskBlock task={task} key={task.id} {...props} />
        })}
    </>
  )
}

export default TasksHome
