import React from 'react'
import { withTheme } from 'styled-components'
import { History } from 'history'
import { useQuery } from '@apollo/react-hooks'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import HexAddr from '../Common/HexAddr'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { Value } from '../Common/GridCell'
import TaskDetailed, { TaskDetailedProps } from '../TaskDetailed'
import SearchBar from 'components/Common/SearchBar'
import {
  TASKS_BY_SECRET_CONTRACT_QUERY,
  TASKS_BY_USER_ADDRESS_QUERY,
  TASKS_QUERY,
  TASKS_INITIAL_VALUES,
  TASKS_BY_ID_QUERY,
} from './queries'
import { Direction, FieldToGraph, GraphToField, TaskBasicData, TaskStatus } from './types'
import { LinkText } from '../Common/LinkText'
import { DocumentNode } from 'graphql'

interface TasksProps {
  theme?: any
  history: History
  match?: {
    params: {
      userAddress?: string
    }
  }
  scAddr?: string
  scTasks?: string
  query: DocumentNode
  queryVariables: any
}

interface TaskIdProps {
  onClick: () => void
  id: string
}
const TaskId: React.FC<TaskIdProps> = ({ id, onClick }) => (
  <LinkText underline={true} onClick={onClick}>
    <HexAddr start={8} end={8}>
      {id}
    </HexAddr>
  </LinkText>
)

interface StatusProps {
  color: string
  status: string
}
const Status: React.FC<StatusProps> = ({ color, status }) => (
  <Value underline={false} color={color}>
    {status}
  </Value>
)

interface TaskEpochProps {
  onClick: () => void
  id: string
}
const TaskEpoch: React.FC<TaskEpochProps> = ({ id, onClick }) => (
  <LinkText underline={true} onClick={onClick}>
    {id}
  </LinkText>
)

interface TaskUserProps {
  onClick: () => void
  user: string
}
const TaskUser: React.FC<TaskUserProps> = ({ user, onClick }) => (
  <LinkText underline={true} onClick={onClick}>
    {user}
  </LinkText>
)

interface TaskSecretContractProps {
  onClick: () => void
  secretContract: string
}
const TaskSecretContract: React.FC<TaskSecretContractProps> = ({ onClick, secretContract }) => (
  <LinkText underline={true} onClick={onClick}>
    <HexAddr start={8} end={8}>
      {secretContract}
    </HexAddr>
  </LinkText>
)

const HEADER_CELLS = [
  { id: 'taskId', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.start, label: 'Task ID' },
  { id: 'taskStatus', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.center, label: 'Status' },
  { id: 'taskEpochNumber', useClassShowOnDesktop: false, sortable: false, align: FlexAlign.end, label: 'Epoch' },
  { id: 'taskUserAddress', useClassShowOnDesktop: true, sortable: true, align: FlexAlign.start, label: 'User' },
  {
    id: 'taskScAddress',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.start,
    label: 'Secret Contract',
  },
  {
    id: 'taskEngGasUsed',
    useClassShowOnDesktop: true,
    sortable: true,
    align: FlexAlign.end,
    label: 'ENG Gas Used',
  },
  { id: 'taskNumber', useClassShowOnDesktop: true, sortable: true, align: FlexAlign.end, label: 'Task Number' },
]

const TasksWrapper: React.FC<any> = ({ history, match = { params: {} }, scAddr, scTasks }) => {
  const {
    params: { userAddress: sender },
  } = match
  const [taskParams, setTaskParams] = React.useState({ query: TASKS_QUERY, queryVariables: TASKS_INITIAL_VALUES })

  React.useEffect(() => {
    if (scAddr) {
      setTaskParams({ query: TASKS_BY_SECRET_CONTRACT_QUERY, queryVariables: { ...TASKS_INITIAL_VALUES, scAddr } })
    } else if (sender) {
      setTaskParams({ query: TASKS_BY_USER_ADDRESS_QUERY, queryVariables: { ...TASKS_INITIAL_VALUES, sender } })
    }
  }, [])

  const handleRequestSearch = async (event: React.SyntheticEvent<React.FormEvent>, id: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (!id) return

    setTaskParams({ query: TASKS_BY_ID_QUERY, queryVariables: { ...TASKS_INITIAL_VALUES, id } })
  }

  const handleClearSearch = () => {
    setTaskParams({ query: TASKS_QUERY, queryVariables: TASKS_INITIAL_VALUES })
  }

  const right =
    !scAddr && !sender ? <SearchBar onRequestSearch={handleRequestSearch} onClearSearch={handleClearSearch} /> : null

  return (
    <>
      <SectionTitle right={right}>
        Tasks
        {sender && (
          <span>
            {' '}
            From User <LinkText underline={false}>{sender}</LinkText>
          </span>
        )}
      </SectionTitle>
      <Tasks {...taskParams} history={history} scTasks={scTasks} />
    </>
  )
}

const Tasks: React.FC<TasksProps> = withTheme(({ theme, history, scTasks, query, queryVariables }) => {
  const { data, error, loading, variables, refetch } = useQuery(query, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  })
  const { total, skip, orderBy, orderDirection } = variables

  if (error) console.error(error.message)

  const handleRequestSort = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    sortField: keyof typeof FieldToGraph,
  ) => {
    refetch({
      total,
      skip: TASKS_INITIAL_VALUES.skip,
      orderBy: FieldToGraph[sortField] === orderBy ? orderBy : FieldToGraph[sortField],
      orderDirection: orderDirection === Direction.descending ? Direction.ascending : Direction.descending,
    })
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    refetch({ ...variables, skip: page * total })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    refetch({ ...variables, total: +event.target.value, skip: TASKS_INITIAL_VALUES.skip })
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [modalProps, setModalProps] = React.useState<TaskDetailedProps | null>(null)
  const closeModal = () => setModalIsOpen(false)
  const openModal = (task: TaskDetailedProps) => {
    const taskStatus = TaskStatus[task.status]
    const taskStatusColor = theme.taskStatus[taskStatus.toLowerCase() as keyof typeof theme.taskStatus]
    const taskDetailedProps: TaskDetailedProps = { ...task, taskStatus, taskStatusColor }

    setModalProps({ ...taskDetailedProps, history })
    setModalIsOpen(true)
  }

  const goToUserDetails = (userAddress: string) => {
    history.push(`/tasks/${userAddress}`)
  }

  const goToSecretContractDetails = (scAddress: string) => {
    history.push(`/contract/${scAddress}`)
  }

  const goToEpochDetailed = (epochId: string) => {
    history.push(`/epochs/${epochId}`)
  }

  const extractTaskData = (task: TaskBasicData, index: number) => {
    const taskStatus = TaskStatus[task.status]
    const taskStatusColor = theme.taskStatus[taskStatus.toLowerCase() as keyof typeof theme.taskStatus]
    const taskDetailedProps: TaskDetailedProps = { ...task, taskStatus, taskStatusColor }

    const id = {
      align: HEADER_CELLS[0].align,
      useClassShowOnDesktop: false,
      id: `${task.id}_${task.id}_id_${index}`,
      value: <TaskId id={task.id} onClick={() => openModal(taskDetailedProps)} />,
    }
    const status = {
      align: HEADER_CELLS[1].align,
      useClassShowOnDesktop: false,
      id: `${task.id}_${taskStatus}_status_${index}`,
      value: <Status color={taskStatusColor} status={taskStatus} />,
    }
    const epoch = {
      align: HEADER_CELLS[2].align,
      useClassShowOnDesktop: false,
      id: `${task.id}_${task.epoch.id}_epoch_${index}`,
      value: <TaskEpoch id={task.epoch.id} onClick={() => goToEpochDetailed(task.epoch.id)} />,
    }
    const user = {
      align: HEADER_CELLS[3].align,
      useClassShowOnDesktop: true,
      id: `${task.id}_${task.sender}_user_${index}`,
      value: <TaskUser user={task.sender} onClick={() => goToUserDetails(task.sender)} />,
    }
    const secretContract = {
      align: HEADER_CELLS[4].align,
      useClassShowOnDesktop: true,
      id: `${task.id}_${task.secretContract && task.secretContract.address}_sc_${index}`,
      value: task.secretContract ? (
        <TaskSecretContract
          secretContract={task.secretContract.address}
          onClick={() => task && task.secretContract && goToSecretContractDetails(task.secretContract.address)}
        />
      ) : (
        '-'
      ),
    }
    const gasUsed = {
      align: HEADER_CELLS[5].align,
      useClassShowOnDesktop: true,
      id: `${task.id}_${task.gasUsed}_gu_${index}`,
      value: task.gasUsed,
    }
    const number = {
      align: HEADER_CELLS[6].align,
      useClassShowOnDesktop: true,
      id: `${task.id}_${task.order}_nr_${index}`,
      value: task.order,
    }

    return {
      id: task.id,
      cells: [id, status, epoch, user, secretContract, gasUsed, number],
    }
  }

  return (
    <>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={data && data.tasks && data.tasks.map(extractTaskData)}
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: scTasks ? +scTasks : data ? +data.enigmaState.taskCount : 0,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      {modalProps !== null && <TaskDetailed {...modalProps} modalIsOpen={modalIsOpen} closeModal={closeModal} />}
      {loading && !data && <FullLoading />}
    </>
  )
})

export default TasksWrapper
