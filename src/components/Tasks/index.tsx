import React, { ChangeEvent } from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import HexAddr from '../Common/HexAddr'

const TASKS_QUERY = gql`
  query Tasks($total: Int, $offset: Int, $limit: Int) {
    tasks(first: $total, orderBy: createdAtBlock, orderDirection: desc) {
      id
      status
      sender
      gasPx
    }
  }
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

const Tasks = () => {
  const { data, error, loading, fetchMore } = useQuery(TASKS_QUERY, { variables: { total: 10 } })
  const [tasks, setTasks] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  React.useEffect(() => {
    if (!loading && !error) {
      setTasks(
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        data.tasks.map(task => ({
          id: task.id,
          cells: [
            {
              align: 'center',
              id: `${task.id}_${task.id}`,
              value: (
                <HexAddr start={5} end={5}>
                  {task.id}
                </HexAddr>
              ),
            },
            { align: 'center', id: `${task.id}_${task.status}`, value: task.status },
            { align: 'center', id: `${task.id}_${'111'}`, value: '111' },
            { align: 'center', id: `${task.id}_${task.sender}`, value: task.sender },
            { align: 'center', id: `${task.id}_${'0x0'}`, value: '0x0' },
            { align: 'center', id: `${task.id}_${task.gasPx}`, value: task.gasPx },
            { align: 'center', id: `${task.id}_${'0'}`, value: '0' },
          ],
        })),
      )
    }
  }, [data, loading])

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const total = +event.target.value

    setRowsPerPage(total)

    fetchMore({
      variables: { total },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return { ...prev, tasks: [...fetchMoreResult.tasks] }
      },
    })
  }

  return (
    <>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: 'asc',
          orderBy: 'taskId',
          onRequestSort: console.log.bind(console, 'requestSort'),
        }}
        rows={tasks}
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: tasks.length,
          onChangePage: console.log.bind(console, 'changePage'),
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: 0,
          rowsPerPage,
        }}
      />
    </>
  )
}

export default Tasks
