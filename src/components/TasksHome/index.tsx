import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import TaskBlock from '../TaskBlock'
import { useQuery } from '@apollo/react-hooks'
import { shortEngHumanizer } from '../../utils/humanizer'
import { TASKS_INITIAL_VALUES, TASKS_QUERY, TASKS_SUBSCRIBE } from 'components/Tasks/queries'
import { TaskBasicData } from 'components/Tasks/types'

const TasksHome = (props: any) => {
  const { subscribeToMore, data, error } = useQuery(TASKS_QUERY, {
    variables: { ...TASKS_INITIAL_VALUES, total: 5 },
  })
  const [tasks, setTasks] = React.useState<TaskBasicData[]>([])

  if (error) console.error(error.message)

  React.useEffect(() => {
    return subscribeToMore({
      document: TASKS_SUBSCRIBE,
      variables: { ...TASKS_INITIAL_VALUES, total: 5 },
      updateQuery: (prev, { subscriptionData }) => (subscriptionData.data ? subscriptionData.data : prev),
    })
  }, [subscribeToMore])

  React.useMemo(() => {
    if (data && data.tasks) {
      setTasks(
        data.tasks.map((task: any) => ({
          ...task,
          time: shortEngHumanizer(Date.now() - (new Date(+task.createdAt * 1000) as any)) + ' ago',
        })),
      )
    }
  }, [data])

  return (
    <>
      <SectionTitle>Tasks</SectionTitle>
      {tasks.map((task: TaskBasicData) => {
        return <TaskBlock task={task} key={task.id} {...props} />
      })}
    </>
  )
}

export default TasksHome
