import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import HexAddr from '../Common/HexAddr'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { shortEngHumanizer } from '../../utils/humanizer'

enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

enum FieldToGraph {
  'epochId' = 'order',
  'epochAge' = 'age',
  'epochTotalTasks' = 'tasksCount',
  'epochCompleteTask' = 'tasksCompleted',
  'epochWorkers' = 'workers',
  'epochEngGasUsed' = 'gasUsed',
  'epochEngReward' = 'engReward',
}

enum GraphToField {
  'order' = 'epochId',
  'age' = 'epochAge',
  'tasksCount' = 'epochTotalTasks',
  'tasksCompleted' = 'epochCompleteTask',
  'workers' = 'epochWorkers',
  'gasUsed' = 'epochEngGasUsed',
  'engReward' = 'epochEngReward',
}

interface EpochsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  workerId?: string | null
}

const epochesDetailsFragment = gql`
  fragment EpochsDetails on Epoch {
    id
    startTime
    startBlockNumber
    workers {
      id
    }
    tasksCompletedCount
    tasksCount
    tasksFailedCount
    gasUsed
    reward
  }
`

const latestEpochFragment = gql`
  fragment LatestEpoch on EnigmaState {
    latestEpoch {
      id
    }
  }
`

const EPOCHS_QUERY = gql`
  query Epoches($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    epoches(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...EpochsDetails
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

const EPOCHS_BY_WORKER_QUERY = gql`
  query EpochesByWorker($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $workerId: String) {
    worker(id: $workerId) {
      epochs(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
        ...EpochsDetails
      }
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
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

const Epochs: React.FC<EpochsProps> = ({ title = 'Epochs', workerId = null }: EpochsProps) => {
  const query = workerId ? EPOCHS_BY_WORKER_QUERY : EPOCHS_QUERY
  const queryVariables = workerId ? { ...INITIAL_VALUES, workerId } : INITIAL_VALUES
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

  const getEndTime = (current: boolean, epochId: string) => {
    if (current) return 'current'

    const epochs = workerId ? data.worker.epochs : data.epoches
    const nextEpoch = epochs.find(({ id }: { id: string }) => +id === +epochId + 1)

    return shortEngHumanizer(Date.now() - +nextEpoch.startTime * 1000)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const extractEpochData = epoch => {
    const current = epoch.id === data.enigmaState.latestEpoch.id
    const age = getEndTime(current, epoch.id)

    return {
      id: epoch.id,
      cells: [
        { align: 'center', id: `${epoch.id}_${epoch.id}`, value: epoch.id },
        { align: 'center', id: `${epoch.id}_${age}_age`, value: age },
        { align: 'center', id: `${epoch.id}_${epoch.tasksCount}`, value: epoch.tasksCount },
        {
          align: 'center',
          id: `${epoch.id}_${epoch.tasksCompletedCount + epoch.tasksCount + epoch.tasksFailedCount}`,
          value: `${+epoch.tasksCount !== 0 ? +(+epoch.tasksCompletedCount / +epoch.tasksCount).toFixed(2) * 100 : 0}%`,
        },
        {
          align: 'center',
          id: `${epoch.id}_${epoch.workers.map(({ id }: { id: string | undefined }) => id).join('')}_w`,
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
        { align: 'center', id: `${epoch.id}_${epoch.gasUsed}`, value: epoch.gasUsed },
        { align: 'center', id: `${epoch.id}_${epoch.reward}`, value: epoch.reward },
      ],
    }
  }

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={
          (data && data.epoches && data.epoches.map(extractEpochData)) ||
          (data && data.worker && data.worker.epochs && data.worker.epochs.map(extractEpochData))
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: data ? +data.enigmaState.latestEpoch.id + 1 : 0,
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
