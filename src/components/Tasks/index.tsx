import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import HexAddr from '../Common/HexAddr'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'

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
  'taskEngGasUsed' = 'gasPx',
  'taskNumber' = 'createdAt',
}

enum GraphToField {
  'id' = 'taskId',
  'status' = 'taskStatus',
  'epoch' = 'taskEpochNumber',
  'sender' = 'taskUserAddress',
  'secretContract' = 'taskScAddress',
  'gasPx' = 'taskEngGasUsed',
  'createdAt' = 'taskNumber',
}

const TASKS_QUERY = gql`
  query Tasks($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    tasks(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
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

const INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.taskNumber,
  orderDirection: Direction.descending,
}

const Tasks = () => {
  const { data, error, loading, variables, refetch } = useQuery(TASKS_QUERY, { variables: INITIAL_VALUES })
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

  return (
    <>
      <SectionTitle>Tasks</SectionTitle>
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
          }))
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: 25,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      {loading && <FullLoading />}
    </>
  )
}

export default Tasks
