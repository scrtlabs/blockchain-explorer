import React from 'react'
import styled, { withTheme } from 'styled-components'
import gql from 'graphql-tag'
import { History } from 'history'
import { useQuery } from '@apollo/react-hooks'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import HexAddr from '../Common/HexAddr'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { TaskStatus } from '../TaskBlock'
import { Value } from '../Common/GridCell'
import TaskDetailed, { TaskDetailedProps } from '../TaskDetailed'
import { basicTaskDetailsFragment } from '../../utils/subgrah-queries'

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

interface TasksProps {
  theme?: any
  history: History
  match: {
    params: {
      userAddress: string | undefined
    }
  }
}

interface UserAddressProps extends React.HTMLAttributes<HTMLSpanElement> {
  underline?: boolean
}

const UserAddress = styled.span<UserAddressProps>`
  cursor: ${props => (props.underline ? 'pointer' : 'default')};
  overflow: hidden;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TASKS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...BasicTaskDetails
      epoch {
        id
      }
    }
    enigmaState(id: 0) {
      tasksCount
    }
  }
  ${basicTaskDetailsFragment}
`

const TASKS_BY_USER_ADDRESS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $sender: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: { sender: $sender }) {
      ...BasicTaskDetails
      epoch {
        id
      }
    }
    enigmaState(id: 0) {
      tasksCount
    }
  }
  ${basicTaskDetailsFragment}
`

const HEADER_CELLS = [
  { id: 'taskId', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Task ID' },
  { id: 'taskStatus', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Status' },
  { id: 'taskEpochNumber', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Epoch' },
  { id: 'taskUserAddress', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'User' },
  { id: 'taskScAddress', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Secret Contract' },
  { id: 'taskEngGasUsed', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'ENG Gas Used' },
  { id: 'taskNumber', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Task Number' },
]

const INITIAL_VALUES = {
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
  const queryVariables = userAddress ? { ...INITIAL_VALUES, sender: userAddress } : INITIAL_VALUES
  const { data, error, loading, variables, refetch } = useQuery(query, { variables: queryVariables })
  const { total, skip, orderBy, orderDirection } = variables

  if (error) console.error(error.message)

  const handleRequestSort = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    sortField: keyof typeof FieldToGraph,
  ) => {
    refetch({
      total,
      skip: INITIAL_VALUES.skip,
      orderBy: FieldToGraph[sortField] === orderBy ? orderBy : FieldToGraph[sortField],
      orderDirection: orderDirection === Direction.descending ? Direction.ascending : Direction.descending,
    })
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    refetch({ ...variables, skip: page * total })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    refetch({ ...variables, total: +event.target.value, skip: INITIAL_VALUES.skip })
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [modalProps, setModalProps] = React.useState<TaskDetailedProps | null>(null)
  const closeModal = () => setModalIsOpen(false)

  const openModal = (taskDetailedProps: TaskDetailedProps) => {
    setModalProps({ ...taskDetailedProps })
    setModalIsOpen(true)
  }

  const goToTaskByUser = (userAddress: string) => {
    history.push(`/tasks/${userAddress}`, {})
  }

  return (
    <>
      <SectionTitle>
        Tasks
        {userAddress && (
          <span>
            {' '}
            From User <UserAddress underline={true}>{userAddress}</UserAddress>
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
          data.tasks.map(task => {
            const taskStatus = TaskStatus[task.status as keyof typeof TaskStatus] || 'Success'
            const taskStatusColor = theme.taskStatus[taskStatus.toLowerCase() as keyof typeof theme.taskStatus]

            const taskDetailedProps: TaskDetailedProps = { ...task, taskStatus, taskStatusColor }

            return {
              id: task.id,
              cells: [
                {
                  align: 'center',
                  id: `${task.id}_${task.id}`,
                  value: (
                    <Value underline={true} onClick={() => openModal(taskDetailedProps)}>
                      <HexAddr start={8} end={8}>
                        {task.id}
                      </HexAddr>
                    </Value>
                  ),
                },
                {
                  align: 'center',
                  id: `${task.id}_${taskStatus}`,
                  value: (
                    <Value underline={false} color={taskStatusColor}>
                      {taskStatus}
                    </Value>
                  ),
                },
                { align: 'center', id: `${task.id}_${task.epoch.id}`, value: task.epoch.id },
                {
                  align: 'center',
                  id: `${task.id}_${task.sender}`,
                  value: (
                    <Value underline={true} onClick={() => goToTaskByUser(task.sender)}>
                      {task.sender}
                    </Value>
                  ),
                },
                { align: 'center', id: `${task.id}_${'0x0'}`, value: '0x0' },
                { align: 'center', id: `${task.id}_${task.gasUsed}`, value: task.gasUsed },
                { align: 'center', id: `${task.id}_${task.order}`, value: task.order },
              ],
            }
          })
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: data ? +data.enigmaState.tasksCount : 0,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      <TaskDetailed {...modalProps} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      {loading && !data && <FullLoading />}
    </>
  )
}

export default withTheme(Tasks)
