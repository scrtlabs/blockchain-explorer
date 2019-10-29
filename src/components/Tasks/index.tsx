import React from 'react'
import styled, { withTheme } from 'styled-components'
import gql from 'graphql-tag'
import { History } from 'history'
import { useQuery } from '@apollo/react-hooks'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import HexAddr from '../Common/HexAddr'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { TaskStatus } from '../TaskBlock'
import { Value } from '../Common/GridCell'
import TaskDetailed, { TaskDetailedProps } from '../TaskDetailed'

enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

enum FieldToGraph {
  'taskId' = 'id',
  'taskStatus' = 'status',
  'taskEpochNumber' = 'epoch',
  'taskUserAddress' = 'sender',
  'taskScAddress' = 'secretContract',
  'taskEngGasUsed' = 'gasUsed',
  'taskNumber' = 'order',
}

enum GraphToField {
  'id' = 'taskId',
  'status' = 'taskStatus',
  'epoch' = 'taskEpochNumber',
  'sender' = 'taskUserAddress',
  'secretContract' = 'taskScAddress',
  'gasUsed' = 'taskEngGasUsed',
  'order' = 'taskNumber',
}

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
  optionalEthereumContractAddress: string | null
  time: string
  secretContract: {
    address: string
  } | null
  epoch: {
    id: string
  }
}

interface TasksProps {
  theme?: any
  history: History
  match: {
    params: {
      userAddress: string | undefined
    }
  }
}

interface LinkTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  underline?: boolean
}

export const LinkText = styled.span<LinkTextProps>`
  cursor: ${props => (props.underline ? 'pointer' : 'default')};
  overflow: hidden;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
`

const basicTaskDetailsFragment = gql`
  fragment BasicTaskDetails on Task {
    id
    sender
    createdAtTransaction
    createdAt
    modifiedAt
    status
    order
    gasUsed
    gasLimit
    gasPrice
    optionalEthereumContractAddress
    secretContract {
      address
    }
    epoch {
      id
    }
  }
`

export const TASKS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicTaskDetails
    }
    enigmaState(id: 0) {
      taskCount
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_SUBSCRIBE = gql`
  subscription TasksSubscribe($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicTaskDetails
    }
  }
  ${basicTaskDetailsFragment}
`

export const TASKS_BY_USER_ADDRESS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $sender: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: { sender: $sender }) {
      ...BasicTaskDetails
    }
    enigmaState(id: 0) {
      taskCount
    }
  }
  ${basicTaskDetailsFragment}
`

const HEADER_CELLS = [
  { id: 'taskId', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.flexStart, label: 'Task ID' },
  { id: 'taskStatus', useClassShowOnDesktop: false, sortable: false, align: FlexAlign.center, label: 'Status' },
  { id: 'taskEpochNumber', useClassShowOnDesktop: false, sortable: false, align: FlexAlign.flexEnd, label: 'Epoch' },
  { id: 'taskUserAddress', useClassShowOnDesktop: true, sortable: true, align: FlexAlign.flexStart, label: 'User' },
  {
    id: 'taskScAddress',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.flexStart,
    label: 'Secret Contract',
  },
  {
    id: 'taskEngGasUsed',
    useClassShowOnDesktop: true,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'ENG Gas Used',
  },
  { id: 'taskNumber', useClassShowOnDesktop: true, sortable: true, align: FlexAlign.flexEnd, label: 'Task Number' },
]

export const TASKS_INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.taskNumber,
  orderDirection: Direction.descending,
}

const Tasks: React.FC<TasksProps> = ({ theme, history, match }: TasksProps) => {
  const {
    params: { userAddress },
  } = match
  const query = userAddress ? TASKS_BY_USER_ADDRESS_QUERY : TASKS_QUERY
  const queryVariables = userAddress ? { ...TASKS_INITIAL_VALUES, sender: userAddress } : TASKS_INITIAL_VALUES
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
    const taskStatus = TaskStatus[task.status as keyof typeof TaskStatus] || 'Success'
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

  return (
    <>
      <SectionTitle>
        Tasks
        {userAddress && (
          <span>
            {' '}
            From User <LinkText underline={false}>{userAddress}</LinkText>
          </span>
        )}
      </SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={
          data &&
          data.tasks &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          data.tasks.map((task, index) => {
            const taskStatus = TaskStatus[task.status as keyof typeof TaskStatus] || 'Success'
            const taskStatusColor = theme.taskStatus[taskStatus.toLowerCase() as keyof typeof theme.taskStatus]
            const taskDetailedProps: TaskDetailedProps = { ...task, taskStatus, taskStatusColor }

            return {
              id: task.id,
              cells: [
                {
                  align: FlexAlign.flexStart,
                  useClassShowOnDesktop: false,
                  id: `${task.id}_${task.id}_id_${index}`,
                  value: (
                    <LinkText underline={true} onClick={() => openModal(taskDetailedProps)}>
                      <HexAddr start={8} end={8}>
                        {task.id}
                      </HexAddr>
                    </LinkText>
                  ),
                },
                {
                  align: FlexAlign.center,
                  useClassShowOnDesktop: false,
                  id: `${task.id}_${taskStatus}_status_${index}`,
                  value: (
                    <Value underline={false} color={taskStatusColor}>
                      {taskStatus}
                    </Value>
                  ),
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: false,
                  id: `${task.id}_${task.epoch.id}_epoch_${index}`,
                  value: (
                    <LinkText underline={true} onClick={() => goToEpochDetailed(task.epoch.id)}>
                      {task.epoch.id}
                    </LinkText>
                  ),
                },
                {
                  align: FlexAlign.flexStart,
                  useClassShowOnDesktop: true,
                  id: `${task.id}_${task.sender}_user_${index}`,
                  value: (
                    <LinkText underline={true} onClick={() => goToUserDetails(task.sender)}>
                      {task.sender}
                    </LinkText>
                  ),
                },
                {
                  align: FlexAlign.flexStart,
                  useClassShowOnDesktop: true,
                  id: `${task.id}_${task.secretContract && task.secretContract.address}_sc_${index}`,
                  value: task.secretContract ? (
                    <LinkText underline={true} onClick={() => goToSecretContractDetails(task.secretContract.address)}>
                      <HexAddr start={8} end={8}>
                        {task.secretContract.address}
                      </HexAddr>
                    </LinkText>
                  ) : (
                    '-'
                  ),
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: true,
                  id: `${task.id}_${task.gasUsed}_gu_${index}`,
                  value: task.gasUsed,
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: true,
                  id: `${task.id}_${task.order}_nr_${index}`,
                  value: task.order,
                },
              ],
            }
          })
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: data ? +data.enigmaState.taskCount : 0,
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
}

export default withTheme(Tasks)
