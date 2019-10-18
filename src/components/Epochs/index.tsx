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
  'epochId' = 'id',
  'epochAge' = 'age',
  'epochTotalTasks' = 'tasksCount',
  'epochCompleteTask' = 'tasksCompleted',
  'epochWorkers' = 'workers',
  'epochEngGasUsed' = 'gasUsed',
  'epochEngReward' = 'engReward',
}

enum GraphToField {
  'id' = 'epochId',
  'age' = 'epochAge',
  'tasksCount' = 'epochTotalTasks',
  'tasksCompleted' = 'epochCompleteTask',
  'workers' = 'epochWorkers',
  'gasUsed' = 'epochEngGasUsed',
  'engReward' = 'epochEngReward',
}

const EPOCHS_QUERY = gql`
  query Epoches($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    epoches(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      workers {
        id
      }
    }
  }
`

const HEADER_CELLS = [
  { id: 'epochId', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Number' },
  { id: 'epochAge', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Age' },
  { id: 'epochTotalTasks', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Number Of Tasks' },
  {
    id: 'epochCompleteTasks',
    useClassShowOnDesktop: false,
    align: HeaderCellAlign.flexStart,
    label: '% Of Completed Tasks',
  },
  { id: 'epochWorkers', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Workers' },
  { id: 'epochEngGasUsed', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'ENG Gas Used' },
  { id: 'epochEngReward', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'ENG Reward' },
]

const INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.epochId,
  orderDirection: Direction.descending,
}

const Epochs = () => {
  const { data, error, loading, variables, refetch } = useQuery(EPOCHS_QUERY, { variables: INITIAL_VALUES })

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
      <SectionTitle>Epochs</SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={
          data &&
          data.epoches &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          data.epoches.map(epoch => ({
            id: epoch.id,
            cells: [
              { align: 'center', id: `${epoch.id}_${epoch.id}`, value: epoch.id },
              { align: 'center', id: `${epoch.id}_${'5'}_age`, value: '5' },
              { align: 'center', id: `${epoch.id}_${'111'}`, value: '111' },
              { align: 'center', id: `${epoch.id}_${'100'}`, value: `${'100'}%` },
              {
                align: 'center',
                id: `${epoch.id}_${epoch.workers.length}_w`,
                value:
                  (epoch.workers.length &&
                    epoch.workers.map((worker: { id: string }) => (
                      <div key={worker.id}>
                        <HexAddr start={5} end={5}>
                          {worker.id}
                        </HexAddr>
                      </div>
                    ))) ||
                  'no workers',
              },
              { align: 'center', id: `${epoch.id}_${'0001'}`, value: '0.001' },
              { align: 'center', id: `${epoch.id}_${'1123'}`, value: '1.123' },
            ],
          }))
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: 10,
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

export default Epochs
