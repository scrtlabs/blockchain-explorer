import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { History } from 'history'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import HexAddr from '../Common/HexAddr'
import SectionTitle from 'components/Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { Value } from 'components/Common/GridCell'

enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

enum FieldToGraph {
  'workerAddress' = 'id',
  'workerStackedEng' = 'balance',
  'workerActiveVsTotal' = 'epochCount',
  'workerCompletedTasks' = 'completedTaskCount',
  'workerEngReward' = 'reward',
}

enum GraphToField {
  'id' = 'workerAddress',
  'balance' = 'workerStackedEng',
  'epochCount' = 'workerActiveVsTotal',
  'completedTaskCount' = 'workerCompletedTasks',
  'reward' = 'workerEngReward',
}

const WORKERS_QUERY = gql`
  query Workers($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    workers(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      balance
      epochCount
      completedTaskCount
      failedTaskCount
      reward
    }
    enigmaState(id: 0) {
      latestEpoch {
        id
      }
      workerCount
    }
  }
`

const HEADER_CELLS = [
  { id: 'workerAddress', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.flexStart, label: 'Address' },
  {
    id: 'workerStackedEng',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'Staked ENG',
  },
  {
    id: 'workerActiveVsTotal',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.center,
    label: 'Epochs Active / Total Epochs',
  },
  {
    id: 'workerCompletedTasks',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.flexEnd,
    label: '% Of Completed Tasks',
  },
  {
    id: 'workerEngReward',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'ENG Reward',
  },
]

const INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.workerAddress,
  orderDirection: Direction.descending,
}

interface WorkersProps {
  history: History
}

const Workers: React.FC<WorkersProps> = ({ history }) => {
  const { data, error, loading, variables, refetch } = useQuery(WORKERS_QUERY, { variables: INITIAL_VALUES })
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

  const goToWorkerDetails = (workerId: string) => {
    history.push(`/worker/${workerId}`)
  }

  return (
    <>
      <SectionTitle>Workers</SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={
          data &&
          data.workers &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          data.workers.map((worker, index) => {
            const totalEpochs = +data.enigmaState.latestEpoch.id + 1
            const totalTasks = +worker.completedTaskCount + +worker.failedTaskCount

            return {
              id: worker.id,
              cells: [
                {
                  align: FlexAlign.flexStart,
                  useClassShowOnDesktop: false,
                  id: `${worker.id}_${worker.id}`,
                  value: (
                    <Value underline={true} onClick={() => goToWorkerDetails(worker.id)}>
                      <HexAddr start={8} end={8}>
                        {worker.id}
                      </HexAddr>
                    </Value>
                  ),
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: false,
                  id: `${worker.id}_${worker.balance}`,
                  value: worker.balance,
                },
                {
                  align: FlexAlign.center,
                  useClassShowOnDesktop: true,
                  id: `${worker.id}_${worker.epochCount}_${totalEpochs}`,
                  value: `${worker.epochCount} of ${totalEpochs}`,
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: true,
                  id: `${worker.id}_${worker.completedTaskCount + worker.failedTaskCount}_t_${index}`,
                  value: `${totalTasks ? +(+worker.completedTaskCount / totalTasks).toFixed(2) * 100 : 0}%`,
                },
                {
                  align: FlexAlign.flexEnd,
                  useClassShowOnDesktop: false,
                  id: `${worker.id}_${worker.reward}`,
                  value: worker.reward || '-',
                },
              ],
            }
          })
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: data ? +data.enigmaState.workerCount : 0,
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

export default Workers
