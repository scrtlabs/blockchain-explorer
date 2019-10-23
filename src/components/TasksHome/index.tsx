import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import TaskBlock from '../TaskBlock'
import { useQuery } from '@apollo/react-hooks'
import { GET_RECENT_TASKS, SUBSCRIBE_RECENT_TASKS } from '../../utils/subgrah-queries'
import { shortEngHumanizer } from '../../utils/humanizer'

export interface TaskBasicData {
  id: string
  status: string
  sender: string
  createdAt: string
  modifiedAt: string | null
  createdAtTransaction: string
  order: string
  gasUsed: string
  gasLimit: string
  gasPrice: string
  secretContract: {
    address: string
  } | null
  optionalEthereumContractAddress: string | null
  time: string
}

const TasksHome = (props: any) => {
  const { subscribeToMore, data, error, loading } = useQuery(GET_RECENT_TASKS, { variables: { total: 5 } })
  const [tasks, setTasks] = React.useState<TaskBasicData[]>([])

  const extractTasks = () => {
    setTasks(
      data.tasks.map((task: TaskBasicData) => ({
        ...task,
        time: shortEngHumanizer(Date.now() - (new Date(+task.createdAt * 1000) as any)) + ' ago',
      })),
    )
  }

  React.useEffect(() => {
    if (!loading && !error) {
      extractTasks()
    }

    return subscribeToMore({
      document: SUBSCRIBE_RECENT_TASKS,
      variables: { total: 5 },
      updateQuery: (prev, { subscriptionData }) => (subscriptionData.data ? subscriptionData.data : prev),
    })
  }, [])

  React.useMemo(() => {
    if (data) {
      extractTasks()
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
