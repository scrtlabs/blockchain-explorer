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
  createdAtTransaction: string
  order: string
  gasUsed: string
  gasLimit: string
  optionalEthereumContractAddress: string | null
}

const TasksHome = () => {
  const { subscribeToMore, data, error, loading } = useQuery(GET_RECENT_TASKS, { variables: { total: 5 } })
  const [tasks, setTasks] = React.useState([])

  const extractTasks = () => {
    setTasks(
      data.tasks.map((task: TaskBasicData) => ({
        order: task.order,
        status: task.status === 'RecordCreated' ? 1 : 0, // TODO: fix
        submittedBy: task.sender,
        taskID: task.id,
        time: shortEngHumanizer(Date.now() - (new Date(+task.createdAt * 1000) as any)) + ' ago',
        txHash: task.createdAtTransaction,
        gasUsed: task.gasUsed,
        gasLimit: task.gasLimit,
        callback: task.optionalEthereumContractAddress,
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
      {tasks.map((item, index) => {
        return <TaskBlock item={item} key={index} />
      })}
    </>
  )
}

export default TasksHome
